import DOMPurify from "dompurify";
import styled from "styled-components";

export default function NoteCard({ note }) {
  const { title, body, color } = note;

  return (
    <Card color={color}>
      <Title color={color} title={title}>
        {title}
      </Title>
      <Body
        color={color}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(body),
        }}></Body>
    </Card>
  );
}

const Card = styled.div`
  background-color: ${({ theme, color }) => `${theme.colors[color + "3"]}`};
  color: ${(props) => console.log(props)};
  height: 18rem;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 0.5rem;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme, color }) => `${theme.colors[color + "5"]}`};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme, color }) => `${theme.colors[color + "7"]}`};
  }
`;

const Title = styled.div`
  color: ${({ theme, color }) => `${theme.colors[color + "9"]}`};
  text-overflow: ${({ title }) => (title.length > 20 ? "elipses" : "none")};
  font-size: 2rem;
  padding: 1rem 1rem 0;
  font-weight: 700;
`;

const Body = styled.div`
  padding: 0.5rem 1rem 1rem;
  text-overflow: ellipsis;
  color: ${({ theme, color }) => `${theme.colors[color + "11"]}`};
`;
