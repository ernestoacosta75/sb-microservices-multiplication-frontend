import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IAttempt } from "../interfaces";
import ApiClient from "../../services/ApiClient";

interface ChallengeProps {
   a: string;
   b: string;
   user: string;
   message: string;
   guess: number; 
}

const ChallengeComponent: React.FC = () => {
    /**
     * A hook is a special function that let us "hook into" React features.
     * useState is a hook that let us add React state to function components.
     * When would we use a Hook?
     * If we write a functon componet and realize we need to add some state to it, we can use a Hook inside
     * the existing function component.
     */
    const [a, setA] = useState<number | string>("");
    const [b, setB] = useState<number | string>("");
    const [user, setUser] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [guess, setGuess] = useState<number>(0);
    const [lastAttempts, setLastAttempts] = useState<IAttempt[]>([]); 

    /**
     * useEffect is a React hook that allows to perform side effects in the components.
     * Side effects are any actions that interact with the outside world, such as fetching
     * data, updating the DOM, or using timers.
     * useEffect takes two arguments: a function that contains the side effect logic, and an array
     * of dependencies that controls when the effect runs.
     */
    useEffect(() => {
        refreshChallenge();
    }, []);

    const refreshChallenge = () => {
        ApiClient.challenge().then((res) => {
            if (res.ok) {
            res.json().then((json) => {
                setA(json.factorA);
                setB(json.factorB);
            });
            } else {
                setMessage("Can't reach the server");
            }
        });
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "user") {
          setUser(value);
        } else if (name === "guess") {
          setGuess(Number(value));
        }
      }; 
      
      const handleSubmitResult = (event: FormEvent) => {
        event.preventDefault();
        ApiClient.sendGuess(user, Number(a), Number(b), guess).then((res) => {
          if (res.ok) {
            res.json().then((json) => {
              if (json.correct) {
                setMessage("Congratulations! Your guess is correct");
              } else {
                setMessage(
                  `Oops! Your guess ${json.resultAttempt} is wrong, but keep playing!`
                );
              }
              updateLastAttempts(user);
              refreshChallenge();
            });
          } else {
            setMessage("Error: server error or not available");
          }
        });
      }; 
      
      const updateLastAttempts = (userAlias: string) => {
        ApiClient.getAttempts(userAlias).then((res) => {
          if (res.ok) {
            res.json().then((data: IAttempt[]) => {
              setLastAttempts(data);
            });
          }
        });
      };
      
      return (
        <div className="display-column">
          <div>
            <h3>Your new challenge is</h3>
            <div className="challenge">
              {a} x {b}
            </div>
          </div>
          <form onSubmit={handleSubmitResult}>
            <label>
              Your alias:
              <input
                type="text"
                maxLength={12}
                name="user"
                value={user}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Your guess:
              <input
                type="number"
                min={0}
                name="guess"
                value={guess}
                onChange={handleChange}
              />
            </label>
            <br />
            <input type="submit" value="Submit" />
          </form>
          <h4>{message}</h4>
          {lastAttempts.length > 0 && (
            <LastAttemptsComponent lastAttempts={lastAttempts} />
          )}
        </div>
      );      
};

export default ChallengeComponent;