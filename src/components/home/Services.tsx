import React from "react";

type Card = {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
};

type Service = {
  id: number;
  heading?: string;
  cards?: Card[];
};

interface ServicesProps {
  data: Service;
}

export default function Services({ data }: ServicesProps) {
  const cards: Card[] = data?.cards ?? [];

  return (
    <div className="max-w-[1140px] mx-auto mb-10 px-[50px] md:px-0 mt-24 md:mt-0">
      <h2 className="prata text-(--sand-500) font-normal text-4xl tracking-wide uppercase mb-12 text-center md:text-left">
        {data?.heading}
      </h2>

      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Item
            key={card.id}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
}

interface ItemProps {
  title: string;
  description: string;
}

const Item = ({ title, description }: ItemProps) => {
  return (
    <div
      className="group bg-white flex flex-col border border-[#eff0f0] shadow-lg
                 px-3.5 py-5 text-left
                 transition-all duration-500 ease-in-out 
                 hover:-translate-y-3 hover:bg-[#333743] hover:shadow-lg hover:shadow-[#C6AC83]/40 w-[330px] md:w-auto"
    >
      <h3 className="prata text-xl font-normal leading-9 mb-2 transition-colors duration-300 ease-in-out group-hover:text-white w-2/3">
        {title}
      </h3>
      <p className="lato text-lg font-light text-justify text-[#333743] leading-[30px] tracking-[-0.5px] transition-colors duration-300 ease-in-out group-hover:text-white">
        {description}
      </p>
    </div>
  );
};
