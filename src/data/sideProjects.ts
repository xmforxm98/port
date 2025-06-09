export interface SideProject {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  images: string[];
  link: string;
  image: string; // For compatibility with InfiniteMenu
}

export const sideProjects: SideProject[] = [
  {
    id: "Renault",
    title: "Renault I-A Collaboration",
    description: "I-A Project with Renault France",
    imageUrl: "https://raw.githubusercontent.com/xmforxm98/Images/main/renault_p.png",
    images: [
      "https://raw.githubusercontent.com/xmforxm98/Images/main/renault_p.png", 
      "https://raw.githubusercontent.com/xmforxm98/Images/main/renualt1.png", 
      "https://raw.githubusercontent.com/xmforxm98/Images/main/renualt2.png",   
      "https://raw.githubusercontent.com/xmforxm98/Images/main/renualt7.png", 
      "https://raw.githubusercontent.com/xmforxm98/Images/main/renualt8.png",

    ],
    link: "#"
  },
  {
    id: "Lecoq",
    title: "Le coq sportif",
    description: "Sports vehicle",
    imageUrl: "https://raw.githubusercontent.com/xmforxm98/Images/main/lecoq5.png",
    images: [
      "https://raw.githubusercontent.com/xmforxm98/Images/main/lecoq6.png",
      "https://raw.githubusercontent.com/xmforxm98/Images/main/lecoq5.png",
      "https://raw.githubusercontent.com/xmforxm98/Images/main/lecoq3.png",
      "https://raw.githubusercontent.com/xmforxm98/Images/main/lecoq2.png",
      "https://raw.githubusercontent.com/xmforxm98/Images/main/lecoq1.png",
    ],
    link: "#"
  },
  {
    id: "Citroen",
    title: "PSA Citroen",
    description: "Autonomous Vehicle",
    imageUrl: "https://raw.githubusercontent.com/xmforxm98/Images/main/citroen1.png",
    images: [
     "https://raw.githubusercontent.com/xmforxm98/Images/main/citroen1.png",
     "https://raw.githubusercontent.com/xmforxm98/Images/main/citroen7.png",
     "https://raw.githubusercontent.com/xmforxm98/Images/main/citroen6.png",
     "https://raw.githubusercontent.com/xmforxm98/Images/main/citroen5.png",
     "https://raw.githubusercontent.com/xmforxm98/Images/main/citroen4.png",
     "https://raw.githubusercontent.com/xmforxm98/Images/main/citroen3.png",
     "https://raw.githubusercontent.com/xmforxm98/Images/main/citroen2.png",
    ],
    link: "#"
  },
  {
    id: "Trensdev",
    title: "Trensdev",
    description: "Storytelling-illustration",
    imageUrl: "https://raw.githubusercontent.com/xmforxm98/Images/main/3.jpg",
    images: [
     "https://raw.githubusercontent.com/xmforxm98/Images/main/1.jpg",
     "https://raw.githubusercontent.com/xmforxm98/Images/main/2.jpg",
     "https://raw.githubusercontent.com/xmforxm98/Images/main/3.jpg",
     "https://raw.githubusercontent.com/xmforxm98/Images/main/4.jpg",
     "https://raw.githubusercontent.com/xmforxm98/Images/main/5.jpg",
     "https://raw.githubusercontent.com/xmforxm98/Images/main/6.jpg",
     "https://raw.githubusercontent.com/xmforxm98/Images/main/7.jpg",
     "https://raw.githubusercontent.com/xmforxm98/Images/main/8.jpg",
     "https://raw.githubusercontent.com/xmforxm98/Images/main/9.jpg",
     "https://raw.githubusercontent.com/xmforxm98/Images/main/10.jpg",
     "https://raw.githubusercontent.com/xmforxm98/Images/main/11.jpg",
     "https://raw.githubusercontent.com/xmforxm98/Images/main/12.jpg",
     "https://raw.githubusercontent.com/xmforxm98/Images/main/13.jpg",
     "https://raw.githubusercontent.com/xmforxm98/Images/main/133.jpg",
     "https://raw.githubusercontent.com/xmforxm98/Images/main/15.jpg",
    ],
    link: "#"
  },
  {
    id: "citroen11",
    title: "Citroen Gesture Control",
    description: "Smartwatch App",
    imageUrl: "https://raw.githubusercontent.com/xmforxm98/Images/main/G1.png",
    images: [
      "https://raw.githubusercontent.com/xmforxm98/Images/main/G1.png",
      "https://raw.githubusercontent.com/xmforxm98/Images/main/G2.png",
    ],
    link: "#"
  },
].map(p => ({...p, image: p.imageUrl})); 