import { Feature, FeatureModel } from 'models/Character/Feature/Feature'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Grid,
  Typography,
} from '@material-ui/core'
import { SBox } from 'components/SBox'
import { Markdown } from 'components/Markdown'
import { MapHooks } from 'components/MapHooks'
import React from 'react'
import { observer } from 'mobx-react-lite'
import { ExpandMore } from '@material-ui/icons'
import {
  ClassFeature,
  ClassFeatureModel,
} from 'models/Character/Feature/ClassFeature'
import { GameUiPlusLevelUp } from 'components/DndIcons'

export const FeatureItem = observer(function FeatureItem({
  feature,
}: {
  feature: ClassFeature | Feature | ClassFeatureModel | FeatureModel
}) {
  const data = 'data' in feature ? feature.data : feature
  const choicesCount =
    'data' in feature
      ? feature.choices.reduce((sum, choice) => sum + choice.choicesCount, 0)
      : 0
  return (
    <Grid item style={{ maxWidth: '100%' }}>
      <Accordion>
        <Badge
          style={{ width: '100%', display: 'block' }}
          color={'error'}
          badgeContent={choicesCount}
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <SBox display={'flex'} alignItems={'center'}>
              <Typography variant={'h6'}>
                <b>{data.name}</b>
              </Typography>
              {(data as ClassFeature).improvement && (
                <SBox ml={1} display={'inline-flex'} alignItems={'center'}>
                  <GameUiPlusLevelUp style={{ fontSize: 22 }} />
                </SBox>
              )}
            </SBox>
          </AccordionSummary>
        </Badge>
        <AccordionDetails>
          <div>
            <Typography component={'div'} variant={'body1'}>
              <Markdown>{data.description}</Markdown>
            </Typography>
            {'data' in feature &&
              Array.isArray(feature.choices) &&
              feature.choices?.length > 0 && (
                <SBox mt={1}>
                  <MapHooks
                    hooks={feature.choices.map(({ hook }) => hook)}
                    render={(choices) =>
                      choices.map(({ node }, key) => (
                        <React.Fragment key={key}>{node}</React.Fragment>
                      ))
                    }
                  />
                </SBox>
              )}
          </div>
        </AccordionDetails>
      </Accordion>
    </Grid>
  )
})
