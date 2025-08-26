// src/components/Team/team.ts
// Import images as URL strings so Vite/Astro fingerprint + prefix them.
import NandanaSheri     from '../../assets/team-pictures/NandanaSheri.jpg?url';
import JelenaGvero      from '../../assets/team-pictures/JelenaGvero.JPG?url';
import MehtabKaur       from '../../assets/team-pictures/MehtabKaur.jpeg?url';
import NagaMaddipudi    from '../../assets/team-pictures/NagaMaddipudi.png?url';
import SajalShukla      from '../../assets/team-pictures/SajalShukla.jpeg?url';
import KaylaSison       from '../../assets/team-pictures/KaylaSison.png?url';
import EmanArsham       from '../../assets/team-pictures/EmanArsham.jpeg?url';
import RasleenDhaliwal  from '../../assets/team-pictures/RasleenDhaliwal.jpg?url';
import RajviShah        from '../../assets/team-pictures/RajviShah.jpg?url';
import ZainabAhmed      from '../../assets/team-pictures/ZainabAhmed.jpg?url';
import ClaudiaJimenez   from '../../assets/team-pictures/ClaudiaJimenez.jpg?url';
import FlorianneChe     from '../../assets/team-pictures/FlorianneChe.JPG?url';

export type TeamMember = {
  name: string;
  position: string;
  imagePath: string;   
  linkedin: string;
};

const team: TeamMember[] = [
  { name: 'Nandana Sheri',     position: 'Co-President',            imagePath: NandanaSheri,    linkedin: 'https://www.linkedin.com/in/nsheri/' },
  { name: 'Jelena Gvero',      position: 'Co-President',            imagePath: JelenaGvero,     linkedin: 'https://www.linkedin.com/in/jelena-gvero/' },
  { name: 'Mehtab Kaur',       position: 'Secretary',               imagePath: MehtabKaur,      linkedin: 'https://www.linkedin.com/in/mehtabkaurr' },
  { name: 'Naga Maddipudi',    position: 'Professional Events Chair', imagePath: NagaMaddipudi, linkedin: 'https://www.linkedin.com/in/naga-maddipudi' },
  { name: 'Sajal Shukla',      position: 'Treasurer',               imagePath: SajalShukla,     linkedin: 'https://www.linkedin.com/in/sajal-shukla-6b55842b6/' },
  { name: 'Kayla Sison',       position: 'Co-Outreach Chair',       imagePath: KaylaSison,      linkedin: 'https://www.linkedin.com/in/kayla-sison126' },
  { name: 'Eman Arsham',       position: 'Co-Outreach Chair',       imagePath: EmanArsham,      linkedin: 'http://www.linkedin.com/in/emanarsham' },
  { name: 'Rasleen Dhaliwal',  position: 'Co-Social Events Chair',  imagePath: RasleenDhaliwal, linkedin: 'https://www.linkedin.com/in/rasleen-dhaliwal-218a85247/' },
  { name: 'Rajvi Shah',        position: 'Co-Social Events Chair',  imagePath: RajviShah,       linkedin: 'https://www.linkedin.com/in/rajvi-shah12/' },
  { name: 'Zainab Ahmed',      position: 'Co-Mentorship Chair',     imagePath: ZainabAhmed,     linkedin: 'https://www.linkedin.com/in/zainab-ahmed1204' },
  { name: 'Claudia Jimenez',   position: 'Co-Mentorship Chair',     imagePath: ClaudiaJimenez,  linkedin: 'https://www.linkedin.com/in/jimenez-claudia' },
  { name: 'Florianne Che',     position: 'Web Dev Lead',            imagePath: FlorianneChe,    linkedin: 'https://www.linkedin.com/in/florianne-che/' },
];

export default team;
