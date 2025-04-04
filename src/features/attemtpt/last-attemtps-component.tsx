import { LastAttemptsProps } from "../interfaces";

/**
 * The FC interface stands for "Function Component" and this tell to TypeScript 
 * that is a React function component and not just a regular function.
 * Optionally, we can add types for the props by defining an interface and 
 * passing it to the generic FC.
 */
const LastAttemptsComponent: React.FC<LastAttemptsProps> = ({ lastAttempts }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Challenge</th>
                    <th>Your guess</th>
                    <th>Correct</th>
                </tr>
            </thead>
            <tbody>
                {lastAttempts.map((attempt) => (
                    <tr key={attempt.id} style={{ color: attempt.correct ? 'green' : 'red' }}>
                        <td>{attempt.factorA} x {attempt.factorB}</td>
                        <td>{attempt.resultAttempt}</td>
                        <td>{attempt.correct ? "Correct" : `Incorrect (${attempt.factorA * attempt.factorB})`}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default LastAttemptsComponent;