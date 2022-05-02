import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components";
import { useAuth } from "../../context/auth";

export default function Hero() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <HeroContainer>
      <HeroText>
        <div className="title">
          <span className="blue">One</span>&nbsp;
          <span className="orange">place</span>&nbsp;for all your note taking
          needs
        </div>
        <div className="sub-title">
          NoteIt is the best place to note your thoughts and organize your day.
          It is <span className="blue">free</span> to use and provides{" "}
          <span className="blue">realtime sync</span> between various devices.
        </div>
        {!user?.id ? (
          <CtaButton
            variant="secondary__block"
            onClick={() => navigate("/auth/signup")}>
            Signup for Free
          </CtaButton>
        ) : (
          <CtaButton
            variant="primary__block"
            onClick={() => navigate("/notes")}>
            Start Taking Notes
          </CtaButton>
        )}
      </HeroText>
      <HeroImage>
        <img
          src="https://res.cloudinary.com/dut75albw/image/upload/v1651404693/NoteIt/mac_1_ewejaz.png"
          alt="preview"
        />
      </HeroImage>
    </HeroContainer>
  );
}

const HeroContainer = styled.section`
  padding: 2rem 0;
  display: grid;
  gap: 3rem;
  grid-template-columns: 1fr;

  @media screen and (min-width: 64em) {
    grid-template-columns: 2fr 3fr;
    padding: 4rem 0;
  }
`;

const HeroText = styled.div`
  .title {
    font-size: clamp(2.625rem, 1.2857rem + 3.5714vw, 4rem);
    color: ${(props) => props.theme.colors.slate12};
    font-weight: 700;
    letter-spacing: -0.055em;
    line-height: 1.2;
    padding: 2rem 0;
  }

  .sub-title {
    font-size: 1.25rem;
    color: ${(props) => props.theme.colors.slate11};
    font-weight: 500;
    letter-spacing: -0.025em;
    padding: 1rem 0 2rem;
  }

  .blue {
    color: ${(props) => props.theme.colors.blue10};
  }

  .orange {
    color: ${(props) => props.theme.colors.orange10};
  }
`;

const HeroImage = styled.div``;

const CtaButton = styled(Button)`
  padding: 1rem 3rem;
`;
