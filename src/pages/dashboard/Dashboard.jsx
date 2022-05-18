import { Container, Content } from "../../styles/globals";
import styled from "styled-components";
import { useAuth } from "../../context/auth";
import { useNotes } from "../../context/notes";
import { FaRegStickyNote } from "react-icons/fa";
import { IoArchiveOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import {
  arhivedNotes,
  completedNotes,
  inprogressNotes,
  learningNotes,
  personalNotes,
  todoNotes,
  totalNumberOfNotes,
  trashedNotes,
  workNotes,
} from "./Utils";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const { notes } = useNotes();
  const navigate = useNavigate();

  const firstName = user?.user_metadata?.firstName;

  const notesInfo = [
    {
      icon: <FaRegStickyNote />,
      title: "notes in Total",
      value: totalNumberOfNotes(notes),
      nav: "/notes",
    },
    {
      icon: <IoArchiveOutline />,
      title: "archived notes",
      value: arhivedNotes(notes),
      nav: "/archive",
    },
    {
      icon: <AiOutlineDelete />,
      title: "notes in trash",
      value: trashedNotes(notes),
      nav: "/trash",
    },
  ];

  const tagsInfo = [
    {
      tag: "Personal",
      value: personalNotes(notes),
    },
    {
      tag: "Learning",
      value: learningNotes(notes),
    },
    {
      tag: "Work",
      value: workNotes(notes),
    },
    {
      tag: "To do",
      value: todoNotes(notes),
    },
    {
      tag: "In progress",
      value: inprogressNotes(notes),
    },
    {
      tag: "Completed",
      value: completedNotes(notes),
    },
  ];

  return (
    <Container>
      <Content>
        <DashboardWrapper>
          <UserInfo>
            Hi <span>{firstName}</span>
            <p>Here is breif summary of your notes</p>
          </UserInfo>
          <ChartContainer></ChartContainer>
          <NotesInformation>
            {notesInfo.map(({ icon, title, value, nav }) => (
              <DashboardItem key={title} onClick={() => navigate(nav)}>
                <div className="icon">{icon}</div>
                <div className="text">
                  <div className="value">{value}</div>
                  <div>{title}</div>
                </div>
              </DashboardItem>
            ))}
          </NotesInformation>
          <TaggedInfo>
            {tagsInfo.map(({ tag, value }) => (
              <TagInfo key={tag}>
                <div className="tag">{tag}</div>
                <div className="value">{value === 0 ? "N/A" : value}</div>
              </TagInfo>
            ))}
          </TaggedInfo>
        </DashboardWrapper>
      </Content>
    </Container>
  );
}

const UserInfo = styled.div`
  padding: 1rem 0;
  font-weight: 400;
  font-size: 2.5rem;

  span {
    font-weight: 600;
  }

  p {
    color: ${(props) => props.theme.colors.slate11};
    font-size: 1.25rem;
    margin: 0;
  }

  @media screen and (min-width: 64em) {
    grid-column: 1/5;
  }
`;

const ChartContainer = styled.div``;

const DashboardWrapper = styled.section`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;

  @media screen and (min-width: 64em) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const NotesInformation = styled.section`
  grid-column: 1/3;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const DashboardItem = styled.div`
  padding: 1rem;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.blue3};
  min-height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .icon {
    font-size: 3rem;
    color: ${(props) => props.theme.colors.blue9};
  }

  .text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;

    .value {
      color: ${(props) => props.theme.colors.blue9};
      font-size: 1.5rem;
    }
  }
`;

const TaggedInfo = styled.div`
  grid-column: 1/3;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
`;

const TagInfo = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  background-color: ${(props) => props.theme.colors.blue3};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: ${(props) => props.theme.colors.blue10};
  font-weight: 500;
  /* 
  .tag {
    color: ${(props) => props.theme.colors.orange9};
  }

  .value {
    font-weight: 500;
  } */
`;
