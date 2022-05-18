import styled from "styled-components";
import { MdOutlineAttachMoney } from "react-icons/md";
import { AiOutlineThunderbolt, AiOutlineLock } from "react-icons/ai";
import { FiDatabase } from "react-icons/fi";

export default function Features() {
  const features = [
    {
      text: "free forever",
      icon: <MdOutlineAttachMoney />,
    },
    {
      text: "Fast",
      icon: <AiOutlineThunderbolt />,
    },
    {
      text: "secure",
      icon: <AiOutlineLock />,
    },
    {
      text: "Realtime Sync",
      icon: <FiDatabase />,
    },
  ];

  return (
    <FeaturesContainer>
      <FeaturesWrapper>
        {features.map(({ text, icon }) => (
          <Feature key={text}>
            <div className="icon">{icon}</div>
            <div className="text">{text}</div>
          </Feature>
        ))}
      </FeaturesWrapper>
    </FeaturesContainer>
  );
}

const FeaturesContainer = styled.div`
  padding: 2rem 0;
`;

const FeaturesWrapper = styled.div`
  display: grid;
  margin-inline: auto;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  gap: 2rem;
  width: min(80%, 90vw);
  place-items: center;
`;

const Feature = styled.div`
  padding: 1.5rem 2.5rem;
  border-radius: 0.25rem;
  background-color: ${(props) => props.theme.colors.blue2};
  border: 1px solid ${(props) => props.theme.colors.blue8};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 150px;
  height: 150px;
  gap: 0.5rem;

  .icon {
    display: flex;
    color: ${(props) => props.theme.colors.blue10};
    align-content: center;
    justify-content: center;
    font-size: 2rem;
  }

  .text {
    text-transform: capitalize;
    text-align: center;
    justify-self: flex-start;
  }
`;
