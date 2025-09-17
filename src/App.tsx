import { useRef, useState } from "react";
import { Container } from "./components/Container";
import { Button } from "./components/Button";

interface Idea {
  name: string;
  pitch: string;
  features: string[];
  stack: {
    frontend: string;
    backend: string;
    DB: string;
    APIs: string;
    libraries: string;
  };
  challenges: string[];
  outcomes: string[];
}

const experienceLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

function App() {
  const [technology, setTechnology] = useState("React");
  const [language, setLanguage] = useState("English");
  const [level, setLevel] = useState("Beginner");
  const [idea, setIdea] = useState<Idea | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateIdeaButtonRef = useRef<HTMLButtonElement>(null);

  const sendRequest = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/generate-idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ technology, level, language }),
      });

      if (!res.ok) throw new Error("Failed to fetch idea");

      const data: Idea = await res.json();
      setIdea(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      dFlex
      flexDirection="column"
      justifyCenter
      alignCenter
      fullHeight
      fullWidth
      className="p-3"
    >
      <h1 className="mb-3">Idea Generator</h1>

      <Container dFlex justifyCenter alignCenter className="mb-3" fullWidth>
        <div className="d-flex flex-column mb-3">
          <label htmlFor="technology" className="form-label">
            Technology
          </label>
          <input
            id="technology"
            value={technology}
            onChange={(e) => setTechnology(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="d-flex flex-column mb-3">
          <label htmlFor="level" className="form-label">
            Experience Level
          </label>
          <select
            id="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="form-select"
          >
            {experienceLevels.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex flex-column mb-3">
          <label htmlFor="language" className="form-label">
            Language
          </label>
          <input
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="form-control"
          />
        </div>
      </Container>

      <Button
        ref={generateIdeaButtonRef}
        bootstrapVariant="primary"
        onClick={sendRequest}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Idea"}
      </Button>

      {error && <p className="text-danger mt-3">{error}</p>}

      {idea && (
        <Container
          className="border rounded p-3 mt-4 bg-light w-100"
          dFlex
          flexDirection="column"
        >
          <h2>{idea.name}</h2>
          <p>
            <strong>Pitch:</strong> {idea.pitch}
          </p>

          <details className="mb-2">
            <summary>
              <strong>Features</strong>
            </summary>
            <ul>
              {idea.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </details>

          <details className="mb-2">
            <summary>
              <strong>Tech Stack</strong>
            </summary>
            <ul>
              <li>
                <strong>Frontend:</strong> {idea.stack.frontend}
              </li>
              <li>
                <strong>Backend:</strong> {idea.stack.backend}
              </li>
              <li>
                <strong>Database:</strong> {idea.stack.DB}
              </li>
              <li>
                <strong>APIs:</strong> {idea.stack.APIs}
              </li>
              <li>
                <strong>Libraries:</strong> {idea.stack.libraries}
              </li>
            </ul>
          </details>

          <details className="mb-2">
            <summary>
              <strong>Challenges</strong>
            </summary>
            <ul>
              {idea.challenges.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </details>

          <details className="mb-2">
            <summary>
              <strong>Learning Outcomes</strong>
            </summary>
            <ul>
              {idea.outcomes.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </details>
        </Container>
      )}
    </Container>
  );
}

export default App;
