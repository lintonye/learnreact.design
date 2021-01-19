import * as React from 'react'
import { Text, Box, Button } from '.'
import { motion } from 'framer-motion'
import { User as UserIcon, Check as CheckIcon, X as XIcon } from 'react-feather'

type Options = 'YesNo' | string[]

type Props = {
  id: string
  answer: string
  explanation: string
  choice: string
  options?: Options
  stats?: Object
  revealAnswerOnConfirm?: boolean
  answerVisible: boolean
  onConfirm?: (string) => void
  confirmButtonPrimary?: boolean
  onStatusChange?: (status: 'initial' | 'choice-picked' | 'confirmed') => void
}

type DesignProps = Props & {
  confirmed: boolean
  onPickChoice: (string) => void
  onRevealAnswer: () => void
  confirmButtonLabel?: string
}

function collectChoiceIdAndContent(choices) {
  return choices.map((c, idx) => ({
    id: String.fromCharCode('A'.charCodeAt(0) + idx),
    content: c.content || c,
  }))
}

export function QuizDesign({
  options,
  id,
  answerVisible = false,
  answer,
  confirmed = false,
  onConfirm,
  confirmButtonPrimary = false,
  confirmButtonLabel = 'Confirm',
  onPickChoice,
  onRevealAnswer,
  explanation,
  choice,
  stats,
  ...props
}: DesignProps) {
  const choices = collectChoiceIdAndContent(
    options === 'YesNo' ? ['Yes', 'No'] : options,
  )
  const totalVotes =
    stats && Object.keys(stats).reduce((s, key) => s + stats[key], 0)
  const showStats = stats && (confirmed || answerVisible)
  return (
    <Box
      {...props}
      onClick={(event) =>
        event.altKey && typeof onRevealAnswer === 'function' && onRevealAnswer()
      }
    >
      <fieldset id={id} style={{ borderWidth: 0 }}>
        {choices.map((ch, index) => {
          const statBarColor =
            answerVisible && answer === ch.id ? '#A3E2A9' : '#D0D0D0'
          const statColor =
            answerVisible && answer === ch.id ? '#2BA73F' : '#B2B2B2'
          return (
            <div key={ch.id}>
              <label
                style={{
                  display: 'block',
                  position: 'relative',
                  minWidth: 200,
                  marginBottom: 4,
                  padding: 4,
                }}
              >
                <Box display="flex">
                  {answerVisible && choice === ch.id && (
                    <Box position="absolute" left={-17}>
                      {answer === choice ? (
                        <CheckIcon color="green" />
                      ) : (
                        <XIcon color="red" />
                      )}
                    </Box>
                  )}
                  <input
                    type="radio"
                    value={ch.id}
                    name={id}
                    checked={choice === ch.id}
                    style={{ marginRight: 8 }}
                    disabled={confirmed}
                    onChange={() =>
                      typeof onPickChoice === 'function' && onPickChoice(ch.id)
                    }
                  />
                  <Text mr={1} textVariant="smallBold">
                    {String.fromCharCode('A'.charCodeAt(0) + index)}:
                  </Text>
                  <div>{ch.content}</div>
                </Box>
                {/* Stats bar */}
                {showStats && stats[ch.id] > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                    }}
                  >
                    <motion.div
                      animate={{
                        width: `${Math.floor(
                          (stats[ch.id] / totalVotes) * 90,
                        )}%`,
                      }}
                      style={{
                        background: statBarColor,
                        borderRadius: 4,
                        height: 4,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                      }}
                    ></motion.div>
                    <UserIcon size={16} color={statColor} />
                    {showStats && stats[ch.id] && (
                      <small style={{ color: statColor, fontSize: 10 }}>
                        {stats[ch.id]}
                      </small>
                    )}
                  </div>
                )}
              </label>
            </div>
          )
        })}
      </fieldset>
      {answerVisible && (
        <div style={{ color: '#0088EE' }}>
          Answer: {answer}. <p>{explanation}</p>
        </div>
      )}
      {!confirmed && !answerVisible && !!choice && (
        <Button
          maxWidth={150}
          primary={confirmButtonPrimary}
          variant="small"
          onClick={() => typeof onConfirm === 'function' && onConfirm(choice)}
        >
          {confirmButtonLabel}
        </Button>
      )}
    </Box>
  )
}

export default function Quiz(props: Props) {
  const [choice, setChoice] = React.useState(null)
  const [confirmed, setConfirmed] = React.useState(false)
  const [answerVisible, setAnswerVisible] = React.useState(
    props.answerVisible || false,
  )
  const { onConfirm, revealAnswerOnConfirm = true, onStatusChange } = props
  return (
    <QuizDesign
      {...props}
      choice={choice}
      confirmed={confirmed}
      confirmButtonLabel={revealAnswerOnConfirm ? 'Check Answer' : 'Confirm'}
      answerVisible={answerVisible || (confirmed && revealAnswerOnConfirm)}
      onPickChoice={(ch) => {
        setChoice(ch)
        typeof onStatusChange === 'function' && onStatusChange('choice-picked')
      }}
      onConfirm={(choice) => {
        setConfirmed(true)
        typeof onConfirm === 'function' && onConfirm(choice)
        typeof onStatusChange === 'function' && onStatusChange('confirmed')
      }}
      onRevealAnswer={() => setAnswerVisible(true)}
    />
  )
}
