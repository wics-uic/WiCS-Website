// src/components/Team/team.ts
// Import images as URL strings so Vite/Astro fingerprint + prefix them.
import NagaMaddipudi    from '../../assets/team-pictures/NagaMaddipudi.png?url';
import RajviShah        from '../../assets/team-pictures/RajviShah.png?url';
import EmanArsham       from '../../assets/team-pictures/EmanArsham.JPG?url';
import MehtabKaur       from '../../assets/team-pictures/MehtabKaur.jpeg?url';
import ShrinidhiTanthullu     from '../../assets/team-pictures/ShrinidhiTanthullu.jpeg?url';
import BushraYazjanova      from '../../assets/team-pictures/BushraYazjanova.jpg?url';
import KristineMa      from '../../assets/team-pictures/KristineMa.jpeg?url';
import HooriyaKazmi       from '../../assets/team-pictures/HooriyaKazmi.jpg?url';
import RasleenDhaliwal  from '../../assets/team-pictures/RasleenDhaliwal.jpeg?url';
import ZainabAhmed      from '../../assets/team-pictures/ZainabAhmed.jpg?url';
import JessieNouna   from '../../assets/team-pictures/JessieNouna.jpeg?url';
import FatimaRasheed     from '../../assets/team-pictures/FatimaRasheed.jpeg?url';
import FlorianneChe     from '../../assets/team-pictures/FlorianneChe.jpeg?url';
import ZeelPatel     from '../../assets/team-pictures/ZeelPatel.jpeg?url';

export type TeamMember = {
  name: string;
  position: string;
  imagePath: string;   
  linkedin: string;
};

const team: TeamMember[] = [
  { name: 'Rajvi Shah',        position: 'Co-President',  imagePath: RajviShah,       linkedin: 'https://www.linkedin.com/in/rajvi-shah12/' },
  { name: 'Naga Maddipudi',    position: 'Co-President', imagePath: NagaMaddipudi, linkedin: 'https://www.linkedin.com/in/naga-maddipudi' },
  { name: 'Eman Arsham',       position: 'Vice President',       imagePath: EmanArsham,      linkedin: 'http://www.linkedin.com/in/emanarsham' },
  { name: 'Mehtab Kaur',       position: 'Secretary',               imagePath: MehtabKaur,      linkedin: 'https://www.linkedin.com/in/mehtabkaurr' },
  { name: 'Shrinidhi Tanthullu',     position: 'Treasurer',            imagePath: ShrinidhiTanthullu,    linkedin: 'https://www.linkedin.com/in/shrinidhi-tanthullu/' },
  { name: 'Bushra Yazjanova',  position: 'Co-Professional Events Chair',            imagePath: BushraYazjanova,     linkedin: 'https://www.linkedin.com/in/bushra-y-2049402b6/' },
  { name: 'Kristine Ma',       position: 'Co-Professional Events Chair',               imagePath: KristineMa,     linkedin: 'https://www.linkedin.com/in/kristine-m-17106b251/' },
  { name: 'Hooriya Kazmi',       position: 'Social Events Chair',       imagePath: HooriyaKazmi,      linkedin: 'https://www.linkedin.com/in/hkazmi1/' },
  { name: 'Rasleen Dhaliwal',  position: 'Co-Outreach Chair',  imagePath: RasleenDhaliwal, linkedin: 'https://www.linkedin.com/in/rasleen-dhaliwal-218a85247/' },
  { name: 'Zainab Ahmed',      position: 'Co-Outreach Chair',     imagePath: ZainabAhmed,     linkedin: 'https://www.linkedin.com/in/zainab-ahmed1204/' },
  { name: 'Jessie Nouna',   position: 'Co-Mentorship Chair',     imagePath: JessieNouna,  linkedin: 'https://www.linkedin.com/in/jessienouna/' },
  { name: 'Fatima Rasheed',   position: 'Co-Mentorship Chair',     imagePath: FatimaRasheed,  linkedin: 'https://www.linkedin.com/in/fatima-rasheed-/' },
  { name: 'Zeel Patel',     position: 'Co-Web Dev Lead',            imagePath: ZeelPatel,    linkedin: 'https://www.linkedin.com/in/zeel-patel2212/' },
  { name: 'Florianne Che',     position: 'Co-Web Dev Lead',            imagePath: FlorianneChe,    linkedin: 'https://www.linkedin.com/in/florianne-che/' }
  
];

export default team;
