/**
 * Season 5 Episode 8 — Abomination
 * Public plot: Gay man who participated in a conversion/re-education program is murdered.
 * Suspects include a hostile minister, the program itself, academics studying the topic, and people from the victim’s personal life.
 */

export default {
  number: 8,
  title: 'Abomination',
  overview: `A young gay man is found murdered. He had been involved with a fundamentalist-sponsored sexual re-education (conversion) program and had been receiving hostile communications. Early suspicion falls on an outspoken minister and the program. When those leads are cleared or weakened, the investigation turns to academic and personal circles connected to the victim’s research on the failure of such programs.`,

  evidence: [
    {
      id: 'body',
      name: 'Crime Scene / Body Recovery',
      type: 'Physical',
      description: 'Victim found in the West Village area. Identification takes time. Personal effects point to recent conflict around his sexuality and activism.',
      unlocks: ['victim-id']
    },
    {
      id: 'threats',
      name: 'Threatening Communications',
      type: 'Document',
      description: 'Series of hostile letters and messages from a minister and associated group targeting the victim for his sexuality and public stance.',
      unlocks: ['minister-threats']
    },
    {
      id: 'program',
      name: 'Conversion Program Records',
      type: 'Document',
      description: 'Victim had participated in or been held up by a re-education program. Internal materials and the victim’s later criticism of the program are relevant.',
      unlocks: ['program-link']
    },
    {
      id: 'thesis',
      name: 'Victim’s Research / Thesis',
      type: 'Document',
      description: 'Academic work arguing that sexual re-education programs fail. Creates professional and ideological enemies in certain circles.',
      unlocks: ['academic-conflict']
    },
    {
      id: 'personal',
      name: 'Personal Relationships',
      type: 'Background',
      description: 'Ex-partners and family members with complicated feelings about the victim’s life and choices, including one connected to an academic critic.',
      unlocks: ['personal-motive']
    }
  ],

  suspects: [
    {
      id: 'minister',
      name: 'Outspoken Minister',
      role: 'Source of public hostility and written threats',
      intro: 'Flooded the victim with condemnatory and threatening material. Strong ideological motive, but alibi and direct evidence must be tested.',
      questions: [
        {
          id: 'q1',
          prompt: 'Explain the communications you sent to the victim.',
          response: 'He frames them as religious duty and moral warning. Does not fully disavow the intensity of the language.',
          points: 6,
          unlocks: ['minister-motive']
        },
        {
          id: 'q2',
          prompt: 'Where were you at the time of the murder?',
          response: 'Alibi holds under initial checks. Focus shifts away from direct commission.',
          points: 5,
          requires: ['minister-threats'],
          unlocks: ['minister-cleared']
        }
      ]
    },
    {
      id: 'professor',
      name: 'Academic Critic / Professor',
      role: 'Opposed the victim’s thesis on conversion programs',
      intro: 'Professional and ideological conflict with the victim’s research. Personal connections deepen the possible motive.',
      questions: [
        {
          id: 'q1',
          prompt: 'Describe your disagreement with the victim’s work.',
          response: 'He articulates a strong academic and worldview opposition. Tone suggests the conflict was more than abstract.',
          points: 8,
          requires: ['academic-conflict'],
          unlocks: ['prof-motive']
        },
        {
          id: 'q2',
          prompt: 'What is your relationship to people in the victim’s personal life?',
          response: 'Connections emerge that place him closer to the victim’s intimate circle than initially apparent.',
          points: 12,
          requires: ['personal-motive'],
          unlocks: ['suspect:professor']
        }
      ]
    },
    {
      id: 'ex',
      name: 'Former Partner / Connected Individual',
      role: 'Personal history with the victim',
      intro: 'Complicated emotional history. May also be linked to the academic critic.',
      questions: [
        {
          id: 'q1',
          prompt: 'Walk us through the end of your relationship and any recent contact.',
          response: 'Emotional residue is clear. Timeline and associations require careful cross-checking.',
          points: 8,
          unlocks: ['personal-timeline']
        }
      ]
    }
  ],

  stages: [
    {
      id: 'first-suspects',
      title: 'Ideological vs Personal',
      narrative: 'The loudest public hostility comes from the minister and the conversion milieu. The quieter academic and personal conflicts may be more proximate.',
      choices: [
        {
          label: 'Concentrate resources on the minister and the conversion program',
          result: 'Follows the most visible motive. Risks missing closer personal or professional killers if the alibi holds.',
          points: 3,
          unlocks: ['ideology-focus']
        },
        {
          label: 'Parallel-track the academic conflict and the victim’s personal relationships',
          result: 'Broader net. Positions the investigation to pivot when the minister’s alibi clears.',
          points: 12,
          unlocks: ['parallel-track']
        }
      ]
    },
    {
      id: 'focus',
      title: 'Narrowing to the Academic Circle',
      narrative: 'Ministerial threats are real but the direct evidence and alibi point elsewhere. The thesis conflict and personal links are now primary.',
      choices: [
        {
          label: 'Build the case around the professor’s professional and personal motives',
          result: 'Aligns with the strongest remaining evidence path from public accounts of the episode.',
          points: 15,
          requires: ['suspect:professor', 'prof-motive'],
          conclude: true
        },
        {
          label: 'Keep equal pressure on all remaining personal associates',
          result: 'Thorough but slower; may dilute focus at a critical stage.',
          points: 6,
          conclude: true
        }
      ]
    }
  ],

  goodEnding: 'You tested the loud ideological suspects properly, cleared what could be cleared, and followed the quieter academic and personal conflicts to the resolution consistent with the public plot.',
  partialEnding: 'You identified the main conflict zones but did not cleanly prioritize between ideological noise and closer motives.',
  poorEnding: 'The investigation remained fixed on the most publicly hostile figures after they should have been deprioritized.'
};
