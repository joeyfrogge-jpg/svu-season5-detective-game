/**
 * Season 5 Episode 2 — Manic
 * Public plot: School shooting leaves two students dead. Surviving "victim" is actually the shooter.
 * Psychiatric medication and an aggressive pharmaceutical marketing angle become central.
 */

export default {
  number: 2,
  title: 'Manic',
  overview: `Two high-school basketball players are shot to death in the gym. A third student is found wounded and initially treated as a surviving victim. Investigation reveals he was the shooter. His psychiatric history, prescribed medication, and the role of a pharmaceutical company’s marketing practices become the core of the case.`,

  evidence: [
    {
      id: 'crime-scene',
      name: 'Gym Crime Scene',
      type: 'Physical',
      description: 'Two deceased students, one wounded survivor. Trajectory and positions begin to conflict with a simple “attacker from outside” theory.',
      unlocks: ['scene-anomaly']
    },
    {
      id: 'weapon',
      name: 'Firearm Recovery',
      type: 'Physical',
      description: 'Weapon linked to the wounded student. Ballistics and handling marks require careful interpretation.',
      unlocks: ['weapon-linked']
    },
    {
      id: 'psych-records',
      name: 'Psychiatric History',
      type: 'Medical',
      description: 'Documented mood disorder and recent medication changes. Side-effect profiles become relevant.',
      unlocks: ['med-history']
    },
    {
      id: 'pharma',
      name: 'Prescription & Marketing Materials',
      type: 'Document',
      description: 'Records show the medication was pushed aggressively. Internal marketing language raises questions about disclosure of risks to adolescents.',
      unlocks: ['pharma-angle']
    },
    {
      id: 'witness-students',
      name: 'Student Witness Statements',
      type: 'Testimony',
      description: 'Classmates describe behavioral changes in the shooter in the weeks before the incident.',
      unlocks: ['behavior-change']
    }
  ],

  suspects: [
    {
      id: 'shooter',
      name: 'Joe Blaine',
      role: 'Wounded student / Actual shooter',
      intro: 'Initially listed as a surviving victim. Evidence rapidly reclassifies him as the perpetrator. His mental state and medication are central.',
      questions: [
        {
          id: 'q1',
          prompt: 'Describe what happened in the gym from your perspective.',
          response: 'His account is fragmented and inconsistent with physical evidence. Emotional flatness or agitation may be present depending on current state.',
          points: 5,
          unlocks: ['inconsistent-account']
        },
        {
          id: 'q2',
          prompt: 'How long have you been on this medication and who prescribed it?',
          response: 'He names the medication and the pressure to remain on it for school attendance and performance.',
          points: 10,
          requires: ['med-history'],
          unlocks: ['med-pressure']
        }
      ]
    },
    {
      id: 'mother',
      name: 'Mother of Joe Blaine',
      role: 'Parent',
      intro: 'Concerned parent who has navigated the psychiatric and school systems. Holds key information about treatment decisions.',
      questions: [
        {
          id: 'q1',
          prompt: 'Walk us through the decision to start and continue this medication.',
          response: 'She describes school and clinical pressure. Side effects were minimized or not fully explained to her.',
          points: 10,
          unlocks: ['parent-pressure']
        },
        {
          id: 'q2',
          prompt: 'Did you notice changes after the dosage or medication was adjusted?',
          response: 'Yes. Behavioral shifts that now look significant in hindsight.',
          points: 8,
          requires: ['behavior-change'],
          unlocks: ['side-effect-link']
        }
      ]
    },
    {
      id: 'pharma-rep',
      name: 'Pharmaceutical Representative',
      role: 'Company contact',
      intro: 'Connected to the aggressive marketing of the medication used by the shooter.',
      questions: [
        {
          id: 'q1',
          prompt: 'What risk information was provided to clinicians treating adolescents?',
          response: 'Answers are carefully legal. Gaps between marketing claims and known risks become apparent.',
          points: 12,
          requires: ['pharma-angle'],
          unlocks: ['suspect:pharma']
        }
      ]
    }
  ],

  stages: [
    {
      id: 'reclassify',
      title: 'Reclassifying the Survivor',
      narrative: 'Physical evidence and early statements force a hard question: is the wounded student a victim or the shooter?',
      choices: [
        {
          label: 'Treat him primarily as a surviving victim and focus outward',
          result: 'Investigation loses critical early time on the true source of the violence.',
          points: -8,
          unlocks: ['wrong-reclass']
        },
        {
          label: 'Reclassify him as the primary suspect and secure the medical/psychiatric angle',
          result: 'Correct pivot. Resources move to medication history, school pressure, and corporate responsibility.',
          points: 15,
          requires: ['weapon-linked', 'scene-anomaly'],
          unlocks: ['correct-reclass']
        }
      ]
    },
    {
      id: 'accountability',
      title: 'Where Does Responsibility Lie?',
      narrative: 'The shooter acted. The medication and the way it was marketed and prescribed are also in play. How do you frame the case?',
      choices: [
        {
          label: 'Focus narrowly on the individual criminal act',
          result: 'Cleaner short-term case, but larger systemic issues remain unaddressed.',
          points: 5,
          conclude: true
        },
        {
          label: 'Build the case to include pharmaceutical marketing and clinical pressure',
          result: 'More complex, more significant. Aligns with the broader public narrative of the episode.',
          points: 15,
          requires: ['pharma-angle', 'side-effect-link'],
          unlocks: ['systemic-focus'],
          conclude: true
        },
        {
          label: 'Prioritize the parent’s and school’s decision-making failures',
          result: 'Valid secondary track, but may dilute the strongest available evidence paths.',
          points: 8,
          conclude: true
        }
      ]
    }
  ],

  goodEnding: 'You correctly reclassified the wounded student, followed the medication and marketing trail, and framed a case that accounted for both individual and systemic factors.',
  partialEnding: 'You identified the shooter and some medical context but under-developed the pharmaceutical or clinical pressure dimensions.',
  poorEnding: 'The initial victim framing lasted too long, or the investigation stayed too narrowly on the individual act without examining the treatment context.'
};
