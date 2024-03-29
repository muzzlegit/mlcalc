// //HOOKS
import usePlayerContext from '../../../hooks/usePlayerContext.js';
import useArtefact from '../hooks/useArtefacts.js';

import useCommonImg from '../../../hooks/useCommonImg.js';
import useArtefactsImg from '../hooks/useArtefactsImg';
// import useCurrentArtefact from '../../hooks/useCurrentArtefact';
import useTypeFilter from '../TypeFilter/hooks/useTypeFilter.js';
import useArtefactSelector from './hooks/useArtefactSelector.js';
// //COMPONENTS
import TypeFilter from '../TypeFilter';
import ArtefactsLevelFilter from '../ArtefactsLevelFilter';
import CloseButton from '../../CloseButton';
import Runes from '../../RUNES/Runes';
import Sharpening from '../../SHARPENING';
//STYLES
import { 
  SelectorsBox,
  SelectedArtefact,
  ArtefactTypeWrap,
  ArtefactsListWrap,
  ArtefactsList,
  ArtefactBackgraund,
  ArtefactImg,
  SelectedArtefactWrap,
  BuffIcon,
  BuffsWrap,
  ButtonsBox,
  ButtonItem
} from "./styles/ArtefactsSelector.styled";
import useArtefactsLevelFilter from '../ArtefactsLevelFilter/hooks/useArtefactsLevelFilter.js';
import useSharpeningsList from '../../SHARPENING/SharpeningsList/hooks/useSharpeningsList.js';
import usePlayerStoreData from '../../../hooks/usePlayerStoreData.js';

export default function ArtefactSelector({ place, toggleModal }){
  const player = usePlayerContext();
  const { artefacts } = usePlayerStoreData( player );
  const { setArtefact, deleteArtefact } = useArtefact( player );
  const { artLevel, onLevelClick } = useArtefactsLevelFilter();
  const { selectedArtefact, artefactsArrayByPlace, setSelectedArtefact, onArtefactClick, removeSelectedArtefact, addArtefact } = useArtefactSelector( place, artLevel );
  const [ filter, onTypeClick, onPerfectClick ] = useTypeFilter( selectedArtefact );

  // const [ currentArtefact, getCurrentArtefact, addCurrentArtefact, removeCurrentArtefact, setCurrentArtefact ] = useCurrentArtefact( player, place, onTypeClick );
  // const [ placeArtefacts ] = usePlaceArtefacts( place, currentArtefact, filter.level );
  const [ artefactImg, getArtefactImg ] = useArtefactsImg( '' );

  const [ currentArtefact ] = artefacts.filter( item => item.place === place );
  return(
    <SelectorsBox>
      <ArtefactsListWrap>
        <ArtefactsList>
        {
          artefactsArrayByPlace.map( artefact => {
            return(
              <ArtefactBackgraund
                key = { artefact.id }
              >
                <ArtefactImg
                  id = { artefact.id }
                  background = { getArtefactImg( artefact.icon ) }
                  onClick = { onArtefactClick }
                ></ArtefactImg>
              </ArtefactBackgraund>
            )
          })
        }
        </ArtefactsList>
        <ArtefactsLevelFilter
          artLevel = { artLevel }
          onLevelClick = { onLevelClick }  
        />
      </ArtefactsListWrap>
      <SelectedArtefactWrap>
        <TypeFilter
          filter = { filter }
          onTypeClick = { onTypeClick }
          onPerfectClick = { onPerfectClick }
        />
        <ArtefactTypeWrap
          background = { 
            `${ filter.ancient ? 
            'radial-gradient(circle at center, orange 20% , #111728 50% )' :
            'radial-gradient(circle at center, #89abad 20% , #111728 50% )' }`}        
          >
          <SelectedArtefact
            filters = { currentArtefact && (selectedArtefact.id === currentArtefact.id) }
            background={ selectedArtefact.icon ? getArtefactImg( selectedArtefact.icon ) : null }
          >
          </SelectedArtefact>
          <BuffIcon  
              background = { useCommonImg( 'perfectIcon' ) }
              filter = { `${ filter.perfect }` }
              top = '15%'
              left = '85%'
              height = '26px'
              width = '25px'
            ></BuffIcon>
          <BuffIcon  
              background = { useCommonImg( 'runeIcon' ) }
              filter = { `${ currentArtefact && currentArtefact.runes.length !== 0 }` }
              top = '85%'
              left = '85%'
              height = '22px'
              width = '16px'
            ></BuffIcon>
          <BuffIcon  
              background = { useCommonImg( 'sharpeningIcon' ) }
              filter = { `${ currentArtefact && currentArtefact.sharpening.length !== 0 }` }
              top = '85%'
              left = '15%'
              height = '24px'
              width = '22px'
            ></BuffIcon>
        </ArtefactTypeWrap>
        <ButtonsBox>
          <ButtonItem 
            type = 'button'
            onClick = { () => { addArtefact( selectedArtefact, filter, setArtefact ) }}
            disabled = { 
              currentArtefact && 
              selectedArtefact.id === currentArtefact.id && 
              currentArtefact.ancient === filter.ancient && 
              currentArtefact.perfect === filter.perfect
            }
          > Применить </ButtonItem>
          <ButtonItem 
            type = 'button'
            onClick = { () => { deleteArtefact( selectedArtefact ); removeSelectedArtefact(); }}
          > Удалить </ButtonItem>
        </ButtonsBox>

      </SelectedArtefactWrap>
      <BuffsWrap>
        <Runes 
          checker = { currentArtefact ? currentArtefact.runes.length : false }
          place = { place }
          setArtefact = { setArtefact }
        />
        <Sharpening
          checker = { currentArtefact ? currentArtefact.sharpening.length : false }
          currentSharpenings = { currentArtefact  ? currentArtefact.sharpening : [] }
          place = { place }
        />
      </BuffsWrap>
      <CloseButton
        closeButtonFn = { toggleModal }
        top = { 0 }
        right = { 0 }        
      />

    </SelectorsBox>
  )
}