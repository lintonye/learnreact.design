import * as React from 'react'
import { Button, Radio } from '@/components/design-system'
import { motion } from 'framer-motion'
import {
  FiUser as UserIcon,
  FiCheck as CheckIcon,
  FiX as XIcon,
} from 'react-icons/fi'
import { useQuestionStats, useSubmitQuestion } from './useQuizzes'

type Option = string | React.ReactElement

type Props = {
  id: string
  answer: string
  explanation: string | React.ReactElement
  options?: Option[]
  stats?: { [key: string]: number }
  userId?: string
  revealAnswerOnConfirm?: boolean
  onConfirm?: (choice: string) => void
  confirmButtonPrimary?: boolean
  onStatusChange?: (status: 'initial' | 'choice-picked' | 'confirmed') => void
}

type StaticViewProps = Props & {
  choice?: string
  answerVisible?: boolean
  confirmed?: boolean
  onPickChoice?: (choice: string) => void
  onRevealAnswer?: () => void
  confirmButtonLabel?: string
}

function collectChoiceIdAndContent(choices: Option[]) {
  return choices.map((c, idx) => ({
    id: String.fromCharCode('A'.charCodeAt(0) + idx),
    content: c,
  }))
}

export function QuizStatic({
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
}: StaticViewProps) {
  const choices = options && collectChoiceIdAndContent(options)
  const totalVotes = stats
    ? Object.keys(stats).reduce((s, key) => s + stats[key], 0)
    : 1
  const showStats = stats && (confirmed || answerVisible)
  return (
    <div
      {...props}
      className="space-y-4"
      onClick={(event) =>
        event.altKey && typeof onRevealAnswer === 'function' && onRevealAnswer()
      }
    >
      <fieldset id={id} style={{ borderWidth: 0 }}>
        {choices &&
          choices.map((ch, index) => {
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
                  <div
                    className="grid gap-x-2 items-baseline"
                    css={{ gridTemplateColumns: 'auto auto 1fr' }}
                  >
                    {answerVisible && choice === ch.id && (
                      <div className="absolute -left-6">
                        {answer === choice ? (
                          <CheckIcon color="green" />
                        ) : (
                          <XIcon color="red" />
                        )}
                      </div>
                    )}
                    <Radio
                      type="radio"
                      value={ch.id}
                      name={id}
                      checked={choice === ch.id}
                      sx={{ mr: 2 }}
                      disabled={confirmed}
                      onChange={() =>
                        typeof onPickChoice === 'function' &&
                        onPickChoice(ch.id)
                      }
                    />
                    <div>{String.fromCharCode('A'.charCodeAt(0) + index)}:</div>
                    <div className="auto-cols-fr">{ch.content}</div>
                  </div>
                  {/* Stats bar */}
                  {showStats && stats && stats[ch.id] > 0 && (
                    <div className="flex items-end space-x-1">
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
        <div className="text-blue-600 space-y-4">
          <div>Answer: {answer}.</div>
          <div>{explanation}</div>
        </div>
      )}
      {!confirmed && !answerVisible && !!choice && (
        <Button
          // sx={{ maxWidth: 150 }}
          variant={confirmButtonPrimary ? 'primary' : 'outline'}
          onClick={() => typeof onConfirm === 'function' && onConfirm(choice)}
        >
          {confirmButtonLabel}
        </Button>
      )}
    </div>
  )
}

export function QuizView({
  onConfirm,
  revealAnswerOnConfirm = true,
  onStatusChange,
  ...props
}: Props) {
  const [choice, setChoice] = React.useState<string>()
  const [confirmed, setConfirmed] = React.useState(false)
  const [answerVisible, setAnswerVisible] = React.useState(false)
  return (
    <QuizStatic
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

export function Quiz(props: Props) {
  const { id: questionId, answer: answerId, userId } = props
  const stats = useQuestionStats(questionId)
  const { submitQuestion } = useSubmitQuestion({
    questionId,
    answerId,
    userId,
  })

  return <QuizView {...props} stats={stats} onConfirm={submitQuestion} />
}

export function QuizStats(props: Props) {
  const { id: questionId, answer: answerId, userId = null } = props
  const stats = useQuestionStats(questionId)

  return (
    <div>
      {stats ? (
        <div>
          <h1>
            Total:{' '}
            {Object.keys(stats).reduce((count, key) => count + stats[key], 0)}
          </h1>
          <QuizStatic {...props} stats={stats} answerVisible />
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  )
}
