import React from "react";
import InfiniteMenu from "../../ui/InfiniteMenu/InfiniteMenu";
import { sideProjects } from "../data/sideProjects";

export const SideProjectsPage: React.FC = () => {
  return (
    <div style={{ height: 'calc(100vh - 200px)', position: 'relative' }}>
      <InfiniteMenu items={sideProjects.map(p => ({...p, image: p.imageUrl, link: "#"}))} />
    </div>
  );
}; 