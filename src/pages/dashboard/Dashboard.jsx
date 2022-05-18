import { Container, Content } from "../../styles/globals";
import styled from "styled-components";
import { useAuth } from "../../context/auth";
import { useNotes } from "../../context/notes";
import { MdOutlineStickyNote2 } from "react-icons/md";
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
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const { user } = useAuth();
  const { notes } = useNotes();
  const navigate = useNavigate();

  const firstName = user?.user_metadata?.firstName;

  const notesInfo = [
    {
      icon: <MdOutlineStickyNote2 />,
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

  const data = {
    labels: [
      "Personal",
      "Learning",
      "Work",
      "To do",
      "In progress",
      "Completed",
    ],
    datasets: [
      {
        label: "Number of notes per tag",
        data: [
          personalNotes(notes),
          learningNotes(notes),
          workNotes(notes),
          todoNotes(notes),
          inprogressNotes(notes),
          completedNotes(notes),
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <Content>
        <DashboardWrapper>
          <UserInfo>
            Hi <span>{firstName}</span>
            <p>Here is breif summary of your notes</p>
          </UserInfo>

          <NotesInformation>
            {notesInfo.map(({ icon, title, value, nav }) => (
              <NotesItem key={title} onClick={() => navigate(nav)}>
                <div className="icon">{icon}</div>
                <div className="text">
                  <div className="value">{value}</div>
                  <div>{title}</div>
                </div>
              </NotesItem>
            ))}
          </NotesInformation>
          <ChartContainer>
            <Pie data={data} />
          </ChartContainer>
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

const DashboardWrapper = styled.section`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;

  @media screen and (min-width: 64em) {
    grid-template-rows: auto;
    grid-template-columns: repeat(4, 1fr);
  }
`;

const UserInfo = styled.div`
  padding: 1rem 0;
  font-weight: 400;
  font-size: 2.5rem;
  grid-column: 1/5;

  span {
    font-weight: 600;
  }

  p {
    color: ${(props) => props.theme.colors.slate11};
    font-size: 1.25rem;
    margin: 0;
  }
`;

const ChartContainer = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: 1/1;
  grid-row: 2/3;

  canvas {
    width: min-content;
  }

  @media screen and (min-width: 64em) {
    grid-column: 3/5;
    grid-row: 2/4;
  }
`;

const NotesInformation = styled.section`
  grid-column: 1/3;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const NotesItem = styled.div`
  padding: 1rem;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.blue3};
  min-height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: fit-content;

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
    text-align: center;

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
