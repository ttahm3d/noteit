import { Container } from "../../styles/globals";
import Features from "./Features";
import Hero from "./Hero";

export default function Homepage() {
  return (
    <Container>
      <Hero />
      <Features />
    </Container>
  );
}
