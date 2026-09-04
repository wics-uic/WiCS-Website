// src/components/Team/team.ts
// Import images as URL strings so Vite/Astro fingerprint + prefix them.

import HooriyaKazmi from '../../assets/team-pictures/HooriyaKazmi.jpeg?url';
import MehtabKaur from '../../assets/team-pictures/MehtabKaur.png?url';
import ZainabAhmed from '../../assets/team-pictures/ZainabAhmed.jpg?url';
import RianaAreeb from '../../assets/team-pictures/RianaAreeb.jpg?url';
import VinuthnaDepala from '../../assets/team-pictures/VinuthnaDepala.jpeg?url';
import SaraAlaidroos from '../../assets/team-pictures/SaraAlaidroos.jpg?url';
import UzmaSyed from '../../assets/team-pictures/UzmaSyed.png?url';
import ShrinidhiTanthullu from '../../assets/team-pictures/ShrinidhiTanthullu.jpeg?url';
import FatimaRasheed from '../../assets/team-pictures/FatimaRasheed.jpeg?url';
import AarnaPatel from '../../assets/team-pictures/AarnaPatel.png?url';
import ZeelPatel from '../../assets/team-pictures/ZeelPatel.png?url';
import ParineetSond from '../../assets/team-pictures/ParineetSond.png?url';
import AyelinVellikara from '../../assets/team-pictures/AyelinVellikara.png?url';
import SalamBouso from '../../assets/team-pictures/SalamBouso.png?url';

export type TeamMember = {
  name: string;
  position: string;
  imagePath: string;
  linkedin: string;
};

const team: TeamMember[] = [
  {
    name: 'Mehtab Kaur',
    position: 'President',
    imagePath: MehtabKaur,
    linkedin: 'https://www.linkedin.com/in/mehtabkaurr/',
  },
  {
    name: 'Hooriya Kazmi',
    position: 'President',
    imagePath: HooriyaKazmi,
    linkedin: 'https://www.linkedin.com/in/hkazmi1',
  },
  {
    name: 'Zainab Ahmed',
    position: 'Vice President',
    imagePath: ZainabAhmed,
    linkedin: 'https://www.linkedin.com/in/zainab-ahmed1204',
  },
  {
    name: 'Ayelin Vellikara',
    position: 'Secretary',
    imagePath: AyelinVellikara,
    linkedin: 'https://www.linkedin.com/in/ayelinv/',
  },
  {
    name: 'Riana Areeb',
    position: 'Treasurer',
    imagePath: RianaAreeb,
    linkedin: 'https://www.linkedin.com/in/riana-areeb',
  },
  {
    name: 'Uzma Syed',
    position: 'Social Events Chair',
    imagePath: UzmaSyed,
    linkedin: 'https://www.linkedin.com/in/uzma-syed-98252a31b',
  },
  {
    name: 'Vinuthna Depala',
    position: 'Professional Events Co-Chair',
    imagePath: VinuthnaDepala,
    linkedin: 'https://www.linkedin.com/in/vinuthna-depala-654a21287/',
  },
  {
    name: 'Sara Alaidroos',
    position: 'Professional Events Co-Chair',
    imagePath: SaraAlaidroos,
    linkedin: 'https://www.linkedin.com/in/saraalaidroos/',
  },
  {
    name: 'Shrinidhi Tanthullu',
    position: 'Mentorship Co-Chair',
    imagePath: ShrinidhiTanthullu,
    linkedin: 'https://www.linkedin.com/in/shrinidhi-tanthullu/',
  },
  {
    name: 'Fatima Rasheed',
    position: 'Mentorship Co-Chair',
    imagePath: FatimaRasheed,
    linkedin: 'https://www.linkedin.com/in/fatima-rasheed-/',
  },
  {
    name: 'Aarna Patel',
    position: 'Media Co-Chair',
    imagePath: AarnaPatel,
    linkedin: 'https://www.linkedin.com/in/aarna-patel-915606331/',
  },
  {
    name: 'Salam Bouso',
    position: 'Media Co-Chair',
    imagePath: SalamBouso,
    linkedin: 'https://www.linkedin.com/in/salambouso/',
  },
  {
    name: 'Zeel Patel',
    position: 'Dev Co-Lead',
    imagePath: ZeelPatel,
    linkedin: 'https://www.linkedin.com/in/zeel-patel2212/',
  },
  {
    name: 'Parineet Sond',
    position: 'Dev Co-Lead',
    imagePath: ParineetSond,
    linkedin: 'https://www.linkedin.com/in/parineetsond/',
  },
];

export default team;