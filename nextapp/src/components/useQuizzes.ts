import * as React from 'react'
import { useState, useEffect } from 'react'
import { useFirestore } from '@/lib/firebase'
import { useLocalStorage } from '@/lib/useLocalStorage'
import { nanoid } from 'nanoid'
import firebase from 'firebase/app'

const COLLECTION_NAME = 'quizResponses'
export function useQuestionStats(questionId: string) {
  const [stats, setStats] = useState<{ [key: string]: number }>()
  const firestore = useFirestore()

  useEffect(() => {
    const choicesRef = firebase.firestore().collection(COLLECTION_NAME)
    const unsubscribe = choicesRef
      .where('questionId', '==', questionId)
      // .orderBy("choiceId", "desc")
      .onSnapshot((snapshot) => {
        const stats = snapshot.docs.reduce((ss, doc) => {
          const choiceId: string = doc.get('choiceId')
          //@ts-ignore
          ss[choiceId] = ss[choiceId] > 0 ? ss[choiceId] + 1 : 1
          return ss
        }, {})
        setStats(stats)
      })
    return unsubscribe
  }, [firestore, setStats])
  return stats
}

export function useSubmitQuestion({
  questionId,
  answerId,
  userId,
}: {
  questionId: string
  answerId: string
  userId?: string
}) {
  const [personId, setPersonId] = useLocalStorage('personId', userId)
  const [status, setStatus] = useState('initial')
  const [error, setError] = useState(null)
  const firestore = useFirestore()

  if (personId === null) setPersonId(nanoid())
  // force to use uid if it exists
  if (userId && personId !== userId) setPersonId(userId)
  const submitQuestion = React.useCallback(
    async (choiceId) => {
      // alert(
      //   "personId=" + personId + ",questionId=" + questionId + ", choice=" + choice
      // );
      try {
        setStatus('in-progress')
        const choicesRef = firestore.collection(COLLECTION_NAME)
        const doc = choicesRef.doc(questionId + personId)
        const updates = {
          personId,
          questionId,
          choiceId,
          answerId,
          // @ts-ignore
          lastAnswerTime: firebase.firestore.FieldValue.serverTimestamp(),
          // @ts-ignore
          reviewCount: firebase.firestore.FieldValue.increment(1),
        }
        if ((await doc.get()).exists) await doc.update(updates)
        else await doc.set(updates)
        setStatus('done')
      } catch (error) {
        setStatus('error')
        setError(error)
      }
    },
    [questionId, answerId, personId, firestore],
  )
  return { submitQuestion, status, error }
}

// export function useQuestions() {
//   const questions = React.useContext(QuestionsContext);
//   return questions;
// }

// const REVIEW_SLOTS = [1, 3, 7, 14, 30, 2 * 30, 4 * 30];
// const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
// function getReviewDueDate(lastReviewDate: Date, reviewSlot: number) {
//   const dueDate = new Date(lastReviewDate);
//   const days = REVIEW_SLOTS[clamp(reviewSlot, 0, REVIEW_SLOTS.length - 1)];
//   dueDate.setDate(dueDate.getDate() + days);
//   return dueDate;
// }

// const FEEDBACK_QUESTION_ID_REGEX = /^_feedback/;
// function isReviewable(questionId: string) {
//   return !!!questionId.match(FEEDBACK_QUESTION_ID_REGEX);
// }

// export function useQuestionsDueReview(userId, today = new Date()): Question[] {
//   const allQuestions = useQuestions();
//   const firestore = useFirestore();
//   const [questions, setQuestions] = useState<Question[]>(null);

//   useEffect(() => {
//     if (firestore) {
//       const quizResponseCollection = firestore.collection("quizResponses");
//       quizResponseCollection
//         .where("personId", "==", userId)
//         .get()
//         .then((snapshot) => {
//           const qRecords = snapshot.docs
//             .filter((doc) => isReviewable(doc.get("questionId")))
//             .map((doc) => {
//               const lastAnswerTimestamp = doc.get("lastAnswerTime");
//               const lastAnswerTime = lastAnswerTimestamp
//                 ? lastAnswerTimestamp.toDate()
//                 : new Date(2020, 1, 1);

//               const reviewCount = doc.get("reviewCount") || 0;
//               const reviewSlot = reviewCount - 1;
//               // console.log(
//               //   "timestamp",
//               //   lastAnswerTimestamp,
//               //   "time",
//               //   lastAnswerTime,
//               //   "reviewDueDate",
//               //   getReviewDueDate(lastAnswerTime, reviewSlot),
//               //   "difference",
//               //   differenceInDays(
//               //     getReviewDueDate(lastAnswerTime, reviewSlot),
//               //     today
//               //   )
//               // );
//               return {
//                 reviewCount,
//                 lastAnswerTime,
//                 reviewDueDate: getReviewDueDate(lastAnswerTime, reviewSlot),
//                 questionId: doc.get("questionId"),
//               };
//             })
//             .filter(
//               (question) => differenceInDays(question.reviewDueDate, today) <= 0
//             );

//           setQuestions(
//             allQuestions
//               .map((q) => {
//                 const qRecord = qRecords.find((qr) => qr.questionId === q.id);
//                 return {
//                   ...q,
//                   ...qRecord,
//                 };
//               })
//               .filter((q) => typeof q.questionId !== "undefined")
//           );
//         });
//     }
//   }, [allQuestions, firestore]);
//   return questions;
// }

// /**
//  * {
//  *   midQuestions: [
//  *     { startTime: 20, questions: [{id: '3kdx', elements: [...]}] },
//  *     { startTime: 50, questions: [{id: '3kdx', elements: [...]}] }
//  *   ],
//  *   endQuestions: [{id: '3kdx', elements: [...]}, ...],
//  * }
//  * @param mdChildren
//  */
// export function collectQuizQuestions(mdChildren) {
//   function partitionQuizzes(array, tagName, convertFun = (_, group) => group) {
//     return partition(
//       array,
//       (item) => item && item.props && item.props.originalType === tagName,
//       convertFun
//     );
//   }
//   function findAndParseTime(children) {
//     const array = React.Children.toArray(children);
//     for (let item of array) {
//       if (typeof item === "string") {
//         let regex = /([\d]{1,2}):([\d]{1,2})(\.(\d+))?/;
//         let match = item.match(regex);
//         if (match)
//           return (
//             Number.parseInt(match[1]) * 60 +
//             Number.parseInt(match[2]) +
//             (match[4] ? Number.parseInt(match[4]) / 1000 : 0)
//           );
//       }
//     }
//     return -1;
//   }
//   function createQuestionObject(elements) {
//     let id;
//     elements.forEach((c) => {
//       if (c.props && c.props.mdxType === "Quiz") {
//         id = c.props.id;
//       }
//     });
//     return { id, elements };
//   }
//   const midQuestions = [];
//   let endQuestions = [];
//   let timeGroups = partitionQuizzes(
//     React.Children.toArray(mdChildren),
//     "h1",
//     (h1, content) => ({
//       startTime: findAndParseTime(h1.props.children),
//       content,
//     })
//   )
//     // remove the first item, shift startTime down by 1 element
//     .reduce(
//       (result, timeGroup, index) => {
//         if (index > 0) {
//           result.content.push({
//             startTime: result.lastStartTime,
//             content: timeGroup.content,
//           });
//         }
//         result.lastStartTime = timeGroup.startTime;
//         return result;
//       },
//       { lastStartTime: -2, content: [] }
//     ).content;
//   for (let timeGroup of timeGroups) {
//     // [['Q1', <Quiz />], ['Q2', <Quiz/>]]
//     let questions = partitionQuizzes(timeGroup.content, "hr").map(
//       createQuestionObject
//     );
//     if (timeGroup.startTime > 0) {
//       midQuestions.push({ startTime: timeGroup.startTime, questions });
//     } else {
//       endQuestions = questions;
//     }
//   }
//   return { midQuestions, endQuestions };
// }
