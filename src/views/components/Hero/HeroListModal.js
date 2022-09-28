import { useState } from "react";
import { createPortal } from "react-dom";
//STORE
import useMainAttacker from "../../../data/store/useMainAttacker";
//DATA
import heroes from '../../../data/Heroes.json';
//HELPERS
import { nanoid } from "nanoid";
//STYLES
import { ModalBox, HeroBox } from "./HeroListModal.styled"
//IMAGES
import commonHeroAssetsImg from '../../../img/common/CommonHeroAssets.png';
import heroesImg from '../../../img/common/Heroes.png';

const modalRoot =document.querySelector('#modal-root-level-2')

export default function HeroListModal(){
  const setMainAttackerHero = useMainAttacker(state => state.setHero);
  const onHeroClick = (e) => {
    const hero = heroes.find(hero => hero.id === e.currentTarget.id);
    console.log(e.target)
    setMainAttackerHero({
      checker: true,
      id: hero.id,
      class: hero.class,
      name: hero.name,
      icon: hero[e.currentTarget.title],
      skillsBranch1: hero.skills,
      skillsBranch2: false,
      skillsBranch3: false

    })
  }



  return createPortal(
    <ModalBox>
      { heroes.map((hero) => {
        return (
          <>
          <HeroBox 
            key={nanoid()}
            id={hero.id}
            title={'maleIcon'}
            background={`url(${heroesImg}) ${hero.maleIcon}`}
            onClick={onHeroClick}
          > 
          </HeroBox>
          <HeroBox 
            key={nanoid()}
            id={hero.id}
            title={'femaleIcon'}
            background={`url(${heroesImg}) ${hero.femaleIcon}`}
            onClick={onHeroClick}
          > 
          </HeroBox>
          </>
        )
    })}
    </ModalBox>, modalRoot
  )
}