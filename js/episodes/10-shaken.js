/**
 * Season 5 Episode 10 — Shaken
 * Public plot: Toddler appears abducted from a park while the babysitter is distracted talking to a nanny.
 * Child is quickly found unconscious nearby. Investigation centers on what actually happened and who is responsible for the injuries.
 */

export default {
  number: 10,
  title: 'Shaken',
  overview: `A toddler goes missing from a park while the babysitter is a short distance away speaking with another caregiver. The child is found soon after, unconscious in nearby bushes. What looks at first like a possible abduction becomes an investigation into the cause of the child’s injuries and the actions (or inaction) of the adults responsible for supervision.`,

  evidence: [
    {
      id: 'park',
      name: 'Park Scene & Timeline',
      type: 'Physical',
      description: 'Child last seen under the babysitter’s care. Short window between last visual and discovery of the unconscious child behind bushes.',
      unlocks: ['timeline-short']
    },
    {
      id: 'medical',
      name: 'Medical Findings',
      type: 'Medical',
      description: 'Injuries consistent with severe trauma. Pattern raises the question of inflicted injury versus accident during the brief unsupervised period.',
      unlocks: ['trauma-pattern']
    },
    {
      id: 'babysitter-statement',
      name: 'Babysitter’s Account',
      type: 'Testimony',
      description: 'Claims she only looked away briefly while talking to another nanny. Timeline and distances become critical.',
      unlocks: ['sitter-claim']
    },
    {
      id: 'nanny-witness',
      name: 'Other Caregiver / Nanny',
      type: 'Testimony',
      description: 'Was in conversation with the babysitter. Provides an independent view of attention, duration, and demeanor.',
      unlocks: ['second-adult']
    },
    {
      id: 'prior',
      name: 'Background on Caregivers & Family',
      type: 'Background',
      description: 'Any prior concerns, stress factors, or history that might contextualize the event without assuming guilt.',
      unlocks: ['context']
    }
  ],

  suspects: [
    {
      id: 'babysitter',
      name: 'Babysitter',
      role: 'Primary caregiver at the time of the incident',
      intro: 'Responsible for the child in the park. Her attention was divided. The medical findings make the quality of that supervision and any physical contact central.',
      questions: [
        {
          id: 'q1',
          prompt: 'Describe exactly what you were doing and for how long the child was out of your direct sight.',
          response: 'She maintains it was only moments. Reconstruction of distances and the child’s condition creates tension with that claim.',
          points: 8,
          unlocks: ['duration-questioned']
        },
        {
          id: 'q2',
          prompt: 'Did you at any point handle the child roughly, shake, or drop the child?',
          response: 'Denial. Medical pattern and the short unsupervised window keep the question open.',
          points: 10,
          requires: ['trauma-pattern'],
          unlocks: ['handling-issue']
        }
      ]
    },
    {
      id: 'nanny',
      name: 'Other Nanny / Conversational Partner',
      role: 'Present during the critical period',
      intro: 'Engaged the babysitter in conversation. May have observed more than she initially volunteers about attention and timing.',
      questions: [
        {
          id: 'q1',
          prompt: 'How long were you talking, and what was the babysitter’s focus like?',
          response: 'Her estimate of duration and the babysitter’s engagement level may differ from the babysitter’s own account.',
          points: 8,
          unlocks: ['independent-timing']
        }
      ]
    },
    {
      id: 'parent',
      name: 'Parent(s)',
      role: 'Legal guardians',
      intro: 'Must be informed and may hold information about the child’s baseline, recent behavior, and the babysitter’s history with the family.',
      questions: [
        {
          id: 'q1',
          prompt: 'Any prior incidents, concerns about the babysitter, or recent changes in the child’s health or behavior?',
          response: 'Provides context that either supports or complicates the acute-event theory.',
          points: 6,
          unlocks: ['family-context']
        }
      ]
    }
  ],

  stages: [
    {
      id: 'abduction-vs-injury',
      title: 'Abduction Theory vs Injury Theory',
      narrative: 'The initial 911 and park response treated this as a possible stranger abduction. The child was found quickly and the medical picture suggests a different primary question.',
      choices: [
        {
          label: 'Maintain a broad search posture for a possible abductor while medical results come in',
          result: 'Resource-intensive. May be necessary early, but the short timeline and recovery location already weigh against a classic abduction.',
          points: 2
        },
        {
          label: 'Pivot primary focus to the caregivers present and the mechanism of the child’s injuries',
          result: 'Aligns with the evidence of a very short window and the trauma findings.',
          points: 12,
          requires: ['timeline-short', 'trauma-pattern'],
          unlocks: ['caregiver-focus']
        }
      ]
    },
    {
      id: 'mechanism',
      title: 'Determining Mechanism and Responsibility',
      narrative: 'Medical findings indicate serious trauma. The babysitter was the responsible adult. How do you weigh accident, negligence, and possible inflicted injury?',
      choices: [
        {
          label: 'Build the case around supervisory failure and any evidence of rough handling during the critical window',
          result: 'Holds the responsible adult accountable for the conditions that produced the injury while remaining grounded in the available evidence.',
          points: 15,
          requires: ['handling-issue', 'caregiver-focus'],
          conclude: true
        },
        {
          label: 'Treat the event as an unexplained accident pending stronger proof of intent or specific act',
          result: 'More cautious legally. Risks under-protecting the child if the pattern suggests more than simple accident.',
          points: 5,
          conclude: true
        }
      ]
    }
  ],

  goodEnding: 'You correctly moved off a pure abduction theory, focused on the caregivers and the short timeline, and built a case that addressed both the medical trauma and the failure of supervision.',
  partialEnding: 'You identified the key adults and the injury pattern but did not fully resolve the mechanism or the degree of responsibility.',
  poorEnding: 'The investigation remained oriented toward a stranger abduction after the evidence pointed to a caregiver-related injury event.'
};
