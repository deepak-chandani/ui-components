import Tabs from './Tabs-iii'

const tabsData = [
  {
    id: "html",
    label: "HTML",
    description:
      "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.",
  },
  {
    id: "css",
    label: "CSS",
    description:
      "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
  },
  {
    id: "javascript",
    label: "JavaScript",
    description:
      "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
  },
];

export default function TabsDemoApp() {
  return (
    <div className="demo-container">
      <h3>Tabs component</h3>
      <Tabs data={tabsData} />;
    </div>
  )
}
