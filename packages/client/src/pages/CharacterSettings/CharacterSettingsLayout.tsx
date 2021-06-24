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
import { SBox } from 'components/SBox'
import { observer } from 'mobx-react-lite'

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

export const CharacterSettingsLayout = observer(
  function CharacterSettingsLayout() {
    const { characterId: id } = useParams() as { characterId: string }
    const { pathname } = useLocation()
    const characterModel = useCharacterModel()

    const settingPages = useMemo(() => {
      const create = (title: string, link: string, icon: ReactElement) => ({
        title,
        link,
        icon,
      })

      return [
        create(
          'Основное',
          characterSettingsRoute.link(id),
          <Badge
            color={'error'}
            badgeContent={characterModel.baseAbilitiesChoicesCount}
          >
            <GameUiStats />
          </Badge>,
        ),
        create(
          'Раса',
          characterSettingsRaceRoute.link(id),
          <Badge
            color={'error'}
            badgeContent={characterModel.race.choicesCount}
          >
            <GameUiPlayerBody />
          </Badge>,
        ),
        create(
          'Класс',
          characterSettingsClassRoute.link(id),
          <Badge
            color={'error'}
            badgeContent={characterModel.class.choicesCount}
          >
            <EquipmentWizardHat />,
          </Badge>,
        ),
        create(
          'Описание',
          characterSettingsDescriptionRoute.link(id),
          <GameUiBookSkill />,
        ),
      ]
    }, [
      characterModel.baseAbilitiesChoicesCount,
      characterModel.class.choicesCount,
      characterModel.race.choicesCount,
      id,
    ])

    return (
      <>
        <SBox mt={3} />
        <DefaultContainer relative>
          <SBox mb={3}>
            <Typography variant={'h4'}>
              <Typography variant={'h5'} component={'div'}>
                параметры
              </Typography>
              <b>{characterModel.name}</b>
            </Typography>
          </SBox>
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
          <SBox my={5}>
            <Outlet />
          </SBox>
        </DefaultContainer>
        <Hidden mdUp>
          <SBox pt={7} />
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
  },
)
