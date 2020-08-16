import React, { ReactElement, useMemo } from 'react'
import { DefaultContainer } from 'components/DefaultContainer'
import {
  characterSettingsClassRoute,
  characterSettingsDescriptionRoute,
  characterSettingsRaceRoute,
  characterSettingsRoute,
} from 'constants/routes'
import { Link, Outlet, useLocation, useParams } from 'react-router-dom'
import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Hidden,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core'
import styled, { css } from 'styled-components'
import { useCharacterModel } from 'models/Character/CharacterModelContext'
import {
  EquipmentWizardHat,
  GameUiBookSkill,
  GameUiPlayerBody,
  GameUiStats,
} from 'components/DndIcons'

const SBottomNavigation = styled(BottomNavigation)`
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
`

const STabsWrap = styled.div(
  ({ theme }) => css`
    position: absolute;
    top: 0;
    right: calc(100% + ${theme.spacing(6)}px);
    bottom: 0;
  `,
)

const STabs = styled(Tabs)(
  ({ theme }) => css`
    position: sticky;
    top: ${theme.spacing(2)}px;
  `,
)

export function CharacterSettingsLayout() {
  const { characterId: id } = useParams() as { characterId: string }
  const { pathname } = useLocation()
  const characterModel = useCharacterModel()

  const characterName = characterModel.name.use()
  const isEmptyRace = characterModel.race.isEmpty.use()
  const raceNeededChoicesCount = characterModel.race.neededChoicesCount.use()

  const settingPages = useMemo(() => {
    const create = (title: string, link: string, icon: ReactElement) => ({
      title,
      link,
      icon,
    })

    return [
      create('Основное', characterSettingsRoute.link(id), <GameUiStats />),
      create(
        'Раса',
        characterSettingsRaceRoute.link(id),
        <Badge
          color={'error'}
          badgeContent={+isEmptyRace || raceNeededChoicesCount}
        >
          <GameUiPlayerBody />
        </Badge>,
      ),
      create(
        'Класс',
        characterSettingsClassRoute.link(id),
        <EquipmentWizardHat />,
      ),
      create(
        'Описание',
        characterSettingsDescriptionRoute.link(id),
        <GameUiBookSkill />,
      ),
    ]
  }, [id, isEmptyRace, raceNeededChoicesCount])

  return (
    <>
      <Box mt={3} />
      <DefaultContainer relative>
        <Box mb={3}>
          <Typography variant={'h4'}>
            <Typography variant={'h5'} component={'div'}>
              параметры
            </Typography>
            <b>{characterName}</b>
          </Typography>
        </Box>
        <Hidden smDown>
          <STabsWrap>
            <STabs
              orientation='vertical'
              value={pathname}
              variant='standard'
              scrollButtons='auto'
              indicatorColor='primary'
              textColor='primary'
              centered
            >
              {settingPages.map(({ title, link, icon }) => (
                <Tab
                  key={link}
                  label={title}
                  icon={icon}
                  component={Link}
                  to={link}
                  value={link}
                />
              ))}
            </STabs>
          </STabsWrap>
        </Hidden>
        <Box my={5}>
          <Outlet />
        </Box>
      </DefaultContainer>
      <Hidden mdUp>
        <Box pt={7} />
        <SBottomNavigation value={pathname} showLabels>
          {settingPages.map(({ title, link, icon }) => (
            <BottomNavigationAction
              key={link}
              label={title}
              icon={icon}
              component={Link}
              to={link}
              value={link}
            />
          ))}
        </SBottomNavigation>
      </Hidden>
    </>
  )
}
