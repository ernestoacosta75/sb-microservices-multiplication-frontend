export interface IAttempt {
    id: number;
    factorA: number;
    factorB: number;
    resultAttempt: number;
    correct: boolean;
}

export interface LastAttemptsProps {
    lastAttempts: IAttempt[];
}