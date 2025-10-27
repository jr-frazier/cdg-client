import "react"
import {useEffect, useState} from "react"
import MCQChallenge from "./MCQChallenge.jsx";
import {useApi} from "../../utils/api.js";

export default function ChallengeGenerator() {
    const [challenge, setChallenge] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [difficulty, setDifficulty] = useState("easy")
    const [quota, setQuota] = useState(null)
    const {makeRequest} = useApi()

    useEffect(() => {
        fetchQuota()
    }, [])

    const fetchQuota = async () => {
        try{
            const data = await makeRequest("quota")
            setQuota(data)
        } catch (error) {
            console.error(error)
        }
    }

    const generateChallenge = async () => {
        setIsLoading(true)
        setError(null)
        setChallenge(null)
        try {
            const data = await makeRequest("generate-challenge", {
                method: "POST",
                body: JSON.stringify({difficulty})
            })
            setChallenge(data)
            fetchQuota()
        } catch (error) {
            setError(error.message || "Failed to generate challenge")
        } finally {
            setIsLoading(false)
        }
    }

    const getNextResetTime = () => {
        if(!quota?.last_reset_date) return null

        const resetDate = new Date(quota.last_reset_date)
        resetDate.setHours(resetDate.getHours() + 24)
        return resetDate
    }

    return (
        <div className="challenge-container">
            <h2>Coding Challenge Generator</h2>
            <div className="quota-display">
                <p>Challenges remaining today: {quota?.quota_remaining || 0}</p>
                {quota?.quota_remaining === 0 && (
                    <p>Next reset: {getNextResetTime().toLocaleString()}</p>
                )}
            </div>
            <div className="difficulty-selector">
                <label htmlFor="difficulty">Select Difficulty:</label>
                <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    disabled={isLoading}
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <button
                onClick={generateChallenge}
                // disabled={isLoading || quota?.quota_remaining === 0}
                className="generate-button"
            >
                {isLoading ? "Generation..." : "Generate Challenge"}
            </button>
            {error && <div className="error-message">
                <p>{error}</p>
            </div>
            }

            {challenge && <MCQChallenge challenge={challenge} />}
        </div>
    )
}