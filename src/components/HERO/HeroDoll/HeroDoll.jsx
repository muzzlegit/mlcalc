import { useContext, useState } from "react";
import { nanoid } from "nanoid";
//CONTEXT
import PlayerContext from '../../../helpers/context.js';
//COMPONENTS
import Modal from "../../Modal/Modal";
import ArtCell from '../../ARTEFACTS/ArtCell';
import HeroesList from "../HeroesList";
import SkillsBranch from '../SkillsBranch';
import HeroPicture from "../HeroPicture";
import HeroBranches from "../HeroBranches";
// import HeroBranches from '../HeroBranches/HeroBranches';
// import ArtefactsSelector from "../ArtefactsSelector/ArtefactsSelector";
//HOOKS
import usePlayerStoreData from "../../../hooks/usePlayerStoreData";
import useHeroImg from "../hooks/useHeroImg";
import useArtefacts from "../../ARTEFACTS/hooks/useArtefacts.js";
import useArtefactsSet from "../../../hooks/useArtefactsSet";
import useCommonImg from "../../../hooks/useCommonImg.js";
import useHero from "../hooks/useHero.js";
//STYLES
import { Wrap, DollWrap, BranchesWrap, HeroWrap, HeroBox, ArttefactWrap,
  BranchesBox,
  BranchWrap,
  ButtonsWrap,
  Button 
} from "./styles/HeroDoll.styled"

import CloseButton from "../../CloseButton/CloseButton";
import useModalToggle from "../../../hooks/useModalToggle";



export default function HeroDall({ toggleModal }){
  const player = useContext( PlayerContext );
  const { dallArts } = useArtefacts( player );
  const playerData = usePlayerStoreData( player );
  const [ heroesListModal, toggleHeroesListModal ] = useModalToggle( false );
  const [ artefactstModal, toggleArtefactstModal ] = useModalToggle( false );
  const [ heroImg, heroBackground ] = useHeroImg( player );
  const kit = useArtefactsSet( player );
  const [ currentArtefactId, setCurrentArtefactId ] = useState( false );
  const [ currentArtefactPlace, setCurrentArtefactPlace ] = useState( false );

  const { hero } = useHero( player );

  const addButtonImg = useCommonImg( 'addButton' );
  const removeButtonImg = useCommonImg( 'removeButton' );
  const choiceButtonImg = useCommonImg( 'choiceButton' );
  //CONSTS
  const { skillsBranch1, skillsBranch2, skillsBranch3 } = hero;
  const artFrameImg = useCommonImg( 'artFrame' );
  
  

  const openArtefactsWindow = ( e ) => {
    e.currentTarget.id === '' ? setCurrentArtefactId( false ) : setCurrentArtefactId( e.currentTarget.id );
    setCurrentArtefactPlace( e.currentTarget.attributes.name.value );
    toggleArtefactstModal();
  }

  return (
    <Wrap>
      <CloseButton
        closeButtonFn = { toggleModal }
        top = { '-12px' }
        right = { '24px' }
      />
      <DollWrap>
        <HeroWrap onClick = { toggleHeroesListModal } >
          <HeroPicture 
            player = { player }
            hero = { hero }
            frame = { false }
          />
        </HeroWrap>
        {
          dallArts.map( art => {
            return(
              <ArttefactWrap
                key = { nanoid() }
                id = { art.art.id }
                title = { art.art.name ? art.art.name : art.place }
                name = { art.place }
                onClick = { openArtefactsWindow }
                top = { art.top }
                left = { art.left }
                background = { artFrameImg }
                shadow = { kit.setName ? true : false }
              >
                <ArtCell
                  key = { nanoid() }
                  artefact = { art.art }
                />
              </ArttefactWrap>
            )
          })
        }
          {/* { kit.setName &&
            <p>{ kit.setName }</p>
          }
          { kit.value &&
            kit.value.map( item => {
              return(
                <p
                  key = { item.id }
                >{ item.description }</p>
              )
            })
          } */}
          
      </DollWrap>
      <BranchesWrap>
        <HeroBranches
          player = { player }
        />
      </BranchesWrap>
      { heroesListModal &&
        <Modal
          level = { 1 }
          toggleModal = { toggleHeroesListModal }
        >
          <HeroesList
            player = { player }
            toggleModal = { toggleHeroesListModal } />
        </Modal>
      }
      {/* { artefactstModal &&
        <Modal
          level = { 1 }
          toggleModal = { toggleArtefactstModal }
        >
          <ArtefactsSelector
            player = { player }
            place = { currentArtefactPlace }
            artefactId = { currentArtefactId }
            toggleModal = { toggleArtefactstModal }
          />
        </Modal>
      } */}
    </Wrap>

  )
}