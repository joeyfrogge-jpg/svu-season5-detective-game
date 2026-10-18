/**
 * Season 5 Episode 1 — Tragedy
 * High-level interactive case based on public plot summaries only.
 * Pregnant woman kidnapped / carjacked; initially believed to be serial rapist case,
 * later revealed as ransom plot involving the father and connected parties.
 */

export default {
  number: 1,
  title: 'Tragedy',
  overview: `A high-risk pregnant woman is abducted during what appears to be a carjacking. The squad initially treats it as the work of a known serial offender, but the investigation quickly reveals a more personal and calculated ransom scheme involving the unborn child’s father and people close to him.`,

  evidence: [
    {
      id: '911',
      name: '911 Call Recording',
      type: 'Audio',
      description: 'Partial call from the victim’s vehicle. Sounds of struggle and a demand that is cut short. Timestamps place the abduction near her expected delivery window.',
      unlocks: ['time-critical']
    },
    {
      id: 'vehicle',
      name: 'Abandoned Vehicle',
      type: 'Physical',
      description: 'Victim’s car found nearby. No forced entry damage consistent with classic carjack pattern. Personal items left behind suggest the stop was staged or she knew the approach.',
      unlocks: ['staged-stop']
    },
    {
      id: 'medical',
      name: 'Obstetric Records',
      type: 'Document',
      description: 'High-risk pregnancy notes. Delivery is imminent. Any delay dramatically increases medical danger to both mother and child.',
      unlocks: ['time-critical']
    },
    {
      id: 'phone-logs',
      name: 'Recent Call Logs',
      type: 'Digital',
      description: 'Victim’s phone shows recent contact with the baby’s father and limited other numbers. One number ties to a relative of the father’s current fiancée.',
      unlocks: ['family-connection']
    },
    {
      id: 'ransom',
      name: 'Ransom Demand',
      type: 'Communication',
      description: 'A demand surfaces directed at the father. The tone and knowledge of medical details suggest the captors understand the pregnancy risk.',
      unlocks: ['ransom-confirmed']
    }
  ],

  suspects: [
    {
      id: 'father',
      name: 'Daniel Lester',
      role: 'Father of the unborn child / Ex-partner',
      intro: 'The baby’s father. Currently involved with another woman from a wealthy family. Under pressure from multiple directions.',
      questions: [
        {
          id: 'q1',
          prompt: 'Walk us through your last contact with the victim.',
          response: 'He provides a timeline. Some details align with the phone logs; others feel carefully measured.',
          points: 5,
          unlocks: ['father-timeline']
        },
        {
          id: 'q2',
          prompt: 'Who benefits if this pregnancy disappears from your life?',
          response: 'He becomes defensive. Mentions the fiancée’s family expectations and the social pressure surrounding the relationship.',
          points: 8,
          requires: ['family-connection'],
          unlocks: ['pressure-on-father']
        },
        {
          id: 'q3',
          prompt: 'Has anyone close to you expressed strong feelings about the baby?',
          response: 'He hesitates, then acknowledges that the fiancée’s mother has been very clear about wanting the relationship to continue without complications.',
          points: 10,
          requires: ['pressure-on-father'],
          unlocks: ['mother-in-law-focus']
        }
      ]
    },
    {
      id: 'fiancee',
      name: 'Melinda Granville',
      role: 'Current fiancée of the father',
      intro: 'From a well-connected family. Engaged to the baby’s father. The pregnancy is an obvious complication.',
      questions: [
        {
          id: 'q1',
          prompt: 'How did you learn about the pregnancy and the abduction?',
          response: 'She claims limited prior knowledge and expresses concern, but her emotional register is controlled.',
          points: 5
        },
        {
          id: 'q2',
          prompt: 'Did anyone in your family discuss intervening?',
          response: 'She deflects at first. With pressure she admits her mother has strong opinions and has acted protectively in the past.',
          points: 10,
          requires: ['family-connection'],
          unlocks: ['mother-in-law-focus']
        }
      ]
    },
    {
      id: 'rose',
      name: 'Rose Granville',
      role: 'Mother of the fiancée',
      intro: 'Protective, determined, and used to arranging outcomes that favor her daughter’s future.',
      questions: [
        {
          id: 'q1',
          prompt: 'What is your interest in the outcome of this pregnancy?',
          response: 'She frames everything as protecting her daughter’s future and the stability of the engagement. She does not deny strong feelings.',
          points: 8,
          unlocks: ['suspect:rose']
        },
        {
          id: 'q2',
          prompt: 'Where were you when the abduction occurred?',
          response: 'Her alibi has gaps. Cross-referencing with the ransom timing creates serious questions.',
          points: 12,
          requires: ['ransom-confirmed', 'mother-in-law-focus'],
          unlocks: ['suspect:rose', 'alibi-gap']
        }
      ]
    }
  ],

  stages: [
    {
      id: 'initial',
      title: 'Initial Theory',
      subtitle: 'Working Theory',
      narrative: 'Early indicators pointed toward a serial carjack-rapist pattern. New evidence suggests the stop may have been staged and that the motivation is personal rather than random.',
      choices: [
        {
          label: 'Continue pursuing the serial offender theory',
          result: 'Resources remain focused on the known pattern. Time-critical medical risk increases while the personal angle is under-developed.',
          points: -5,
          unlocks: ['wrong-focus']
        },
        {
          label: 'Shift focus to people connected to the father and the pregnancy',
          result: 'Investigation pivots. Family pressure and financial/social motives come into view.',
          points: 15,
          unlocks: ['correct-focus'],
          requires: ['staged-stop']
        },
        {
          label: 'Treat it as a hybrid: possible offender using personal knowledge',
          result: 'A balanced but slower approach. Some useful leads develop, but urgency remains high.',
          points: 5
        }
      ]
    },
    {
      id: 'pressure',
      title: 'Applying Pressure',
      subtitle: 'Decision Point',
      narrative: 'The ransom and family connections are now clear. How do you proceed against the most protected person of interest?',
      choices: [
        {
          label: 'Confront Rose Granville directly with the alibi gaps and motive',
          result: 'Direct pressure produces cracks in the story and accelerates the resolution of the abduction.',
          points: 15,
          requires: ['alibi-gap'],
          unlocks: ['confronted-rose'],
          conclude: true
        },
        {
          label: 'Use the father as leverage to force cooperation from the Granville side',
          result: 'Indirect pressure works but takes longer. Medical risk to the victim continues to climb.',
          points: 8,
          unlocks: ['indirect-pressure'],
          conclude: true
        },
        {
          label: 'Wait for more physical evidence before any confrontation',
          result: 'Caution preserves some options but costs critical hours.',
          points: 0,
          conclude: true
        }
      ]
    }
  ],

  goodEnding: 'You correctly moved off the serial-offender assumption, followed the family and financial pressure, and applied pressure where it mattered. The case resolves around the personal ransom plot rather than a stranger attack.',
  partialEnding: 'You identified key connections but hesitated on the decisive confrontation or stayed too long on the initial theory. The case still reaches a resolution, but time and clarity were lost.',
  poorEnding: 'Critical personal motives and staged elements were under-weighted. The investigation remained too focused on the wrong pattern for too long.'
};
