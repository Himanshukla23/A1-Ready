/**
 * 2 Original A1 German Listening Comprehension Questions (Hörverstehen)
 * Aligned with Goethe-Zertifikat A1 (Hören) & ÖSD Zertifikat A1.
 * The audioText is played via browser SpeechSynthesis in German.
 * Max score: 2 (1 point per correct answer)
 */

export const LISTENING_QUESTIONS = [
  {
    id: "l1",
    skill: "listening",
    skillLabel: "Listening (Hörverstehen)",
    topic: "Ansage am Bahnhof (Train Station Announcement)",
    instruction: "Listen to the announcement, then answer the question.",
    audioText:
      "Achtung bitte! Der Zug nach München fährt heute um fünfzehn Uhr dreißig ab Gleis drei. Ich wiederhole: fünfzehn Uhr dreißig, Gleis drei. Wir bitten Sie, rechtzeitig am Bahnsteig zu sein.",
    audioTextEnglish:
      "Attention please! The train to Munich departs today at 15:30 from platform 3. I repeat: 15:30, platform 3. Please be at the platform on time.",
    question: "Um wie viel Uhr fährt der Zug nach München ab?",
    options: [
      { id: "A", text: "Um 13:30 Uhr" },
      { id: "B", text: "Um 15:30 Uhr" },
      { id: "C", text: "Um 15:00 Uhr" },
      { id: "D", text: "Um 13:00 Uhr" },
    ],
    correctOptionId: "B",
    explanation:
      "The announcement says 'fünfzehn Uhr dreißig' which is 15:30. Learning tip: 'fünfzehn' = 15, 'dreißig' = 30.",
  },
  {
    id: "l2",
    skill: "listening",
    skillLabel: "Listening (Hörverstehen)",
    topic: "Telefonanruf beim Arzt (Phone Call to Doctor)",
    instruction: "Listen to the phone message, then answer the question.",
    audioText:
      "Guten Tag, hier ist die Praxis Doktor Weber. Wir haben Montag bis Freitag von acht bis siebzehn Uhr geöffnet. Am Mittwochnachmittag ist die Praxis geschlossen. Bitte hinterlassen Sie eine Nachricht nach dem Signalton.",
    audioTextEnglish:
      "Good day, this is Doctor Weber's practice. We are open Monday to Friday from 8 to 17. On Wednesday afternoon the practice is closed. Please leave a message after the tone.",
    question: "Wann ist die Praxis am Mittwoch geschlossen?",
    options: [
      { id: "A", text: "Am Morgen" },
      { id: "B", text: "Am Nachmittag" },
      { id: "C", text: "Den ganzen Tag" },
      { id: "D", text: "Am Abend" },
    ],
    correctOptionId: "B",
    explanation:
      "The message states 'Am Mittwochnachmittag ist die Praxis geschlossen' — On Wednesday afternoon the practice is closed.",
  },
];
