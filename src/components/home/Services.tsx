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
    <div className="max-w-[1140px] mx-auto mb-10 px-5 md:px-0">
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
                 p-6 text-left
                 transition-all duration-500 ease-in-out 
                 hover:-translate-y-3 hover:bg-black hover:shadow-lg hover:shadow-[#C6AC83]/40"
    >
      <h3 className="prata text-lg font-normal leading-7 mb-2 transition-colors duration-300 ease-in-out group-hover:text-white w-2/3">
        {title}
      </h3>
      <p className="prata text-sm font-normal leading-7 text-justify text-gray-600 transition-colors duration-300 ease-in-out group-hover:text-white">
        {description}
      </p>
    </div>
  );
};
