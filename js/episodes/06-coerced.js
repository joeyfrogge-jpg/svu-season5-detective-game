/**
 * Season 5 Episode 6 — Coerced
 * Public plot: Schizophrenic man kidnaps a boy he believes is his son and kills someone who intervenes.
 * Investigation reveals the group home deliberately withheld his medication so he would not be believed about a prior death he witnessed.
 */

export default {
  number: 6,
  title: 'Coerced',
  overview: `A five-year-old boy is taken from his bed by a man in the grip of schizophrenia who is convinced the child is his own son. During the abduction a bystander is killed. Once the boy is recovered, the investigation turns to why the man’s illness was uncontrolled — and uncovers deliberate interference with his medication at the adult group home where he lived, tied to a death he had witnessed there.`,

  evidence: [
    {
      id: 'abduction',
      name: 'Abduction Scene',
      type: 'Physical',
      description: 'Child taken from home at night. Suspect’s identity and mental state become clear quickly once he is located.',
      unlocks: ['suspect-identified']
    },
    {
      id: 'homicide',
      name: 'Bystander Homicide',
      type: 'Physical',
      description: 'Person who tried to intervene is killed. Suspect’s belief system at the time is central to later legal questions.',
      unlocks: ['homicide-linked']
    },
    {
      id: 'med-history',
      name: 'Psychiatric & Medication Records',
      type: 'Medical',
      description: 'Shows the suspect had been stable on medication before a period of deliberate non-compliance or withdrawal at the group home.',
      unlocks: ['med-withdrawn']
    },
    {
      id: 'group-home',
      name: 'Group Home Records & Staff Statements',
      type: 'Document',
      description: 'Inconsistencies around a prior resident’s death ruled a suicide. The suspect had claimed knowledge of what actually happened.',
      unlocks: ['prior-death']
    },
    {
      id: 'witness-lucid',
      name: 'Lucid Statement from Suspect',
      type: 'Testimony',
      description: 'Once restabilized, the suspect provides a coherent account of the prior death and the motive for removing his medication.',
      unlocks: ['cover-up-motive']
    }
  ],

  suspects: [
    {
      id: 'kevin',
      name: 'Kevin Walker',
      role: 'Abductor / Person with schizophrenia',
      intro: 'Believed the child was his son. Capacity and the role of untreated illness are central both to the abduction and to the larger case.',
      questions: [
        {
          id: 'q1',
          prompt: 'Who did you believe the child was, and why did you take him?',
          response: 'He is clear in his delusion at the time. Later, when medicated, he can distinguish the belief from reality.',
          points: 8,
          unlocks: ['delusion-documented']
        },
        {
          id: 'q2',
          prompt: 'What happened at the group home regarding the other resident’s death?',
          response: 'Once lucid he describes what he saw and why staff had reason to discredit him.',
          points: 15,
          requires: ['med-withdrawn', 'prior-death'],
          unlocks: ['cover-up-motive']
        }
      ]
    },
    {
      id: 'haber',
      name: 'Group Home Administrator',
      role: 'Facility leadership',
      intro: 'Responsible for care decisions. Becomes the focus once medication interference and the prior death are linked.',
      questions: [
        {
          id: 'q1',
          prompt: 'Why was this resident’s medication stopped or altered?',
          response: 'Explanations are administrative and unconvincing once the timeline is matched to the prior death.',
          points: 10,
          requires: ['med-withdrawn'],
          unlocks: ['suspect:haber']
        },
        {
          id: 'q2',
          prompt: 'Explain the circumstances of the earlier resident’s death.',
          response: 'The official suicide ruling is defended. Contradictions with the lucid account create serious exposure.',
          points: 12,
          requires: ['cover-up-motive'],
          unlocks: ['suspect:haber']
        }
      ]
    },
    {
      id: 'huang',
      name: 'Dr. George Huang',
      role: 'FBI psychiatrist consultant',
      intro: 'Advises on capacity, medication, and the ethics of forcing treatment in order to obtain information.',
      questions: [
        {
          id: 'q1',
          prompt: 'What are the risks of pushing a patient into a break to compel medication and a statement?',
          response: 'He outlines clinical and legal hazards. The tension between finding the child and proper procedure is explicit.',
          points: 8
        }
      ]
    }
  ],

  stages: [
    {
      id: 'recovery',
      title: 'Recovering the Child',
      narrative: 'The boy’s location is unknown and time is critical. The suspect is in an actively psychotic state.',
      choices: [
        {
          label: 'Use standard interview techniques and wait for voluntary cooperation',
          result: 'Safer procedurally, higher risk to the missing child if the delusion holds.',
          points: 0
        },
        {
          label: 'Apply pressure that risks precipitating a break so medication can be given and information obtained',
          result: 'Controversial. May recover the child faster but creates lasting questions about coercion and future testimony.',
          points: 10,
          unlocks: ['coercion-issue']
        }
      ]
    },
    {
      id: 'facility',
      title: 'The Group Home',
      narrative: 'Evidence now shows the facility had motive to keep the suspect discredited. How do you proceed against the institution?',
      choices: [
        {
          label: 'Focus charges on the administrator for the medication interference and the covered-up death',
          result: 'Direct accountability for the decisions that led to the uncontrolled episode and the abduction.',
          points: 15,
          requires: ['suspect:haber', 'cover-up-motive'],
          conclude: true
        },
        {
          label: 'Treat the facility issues as secondary and concentrate on the abduction/homicide only',
          result: 'Cleaner short case, leaves the systemic abuse largely unaddressed.',
          points: 5,
          conclude: true
        }
      ]
    }
  ],

  goodEnding: 'You recovered the child, documented the capacity issues carefully, and followed the medication interference into the group-home cover-up that set the tragedy in motion.',
  partialEnding: 'You resolved the abduction but only partially developed the facility’s role in destabilizing the suspect.',
  poorEnding: 'The investigation treated the case as a simple mentally-ill offender matter and missed the deliberate actions at the group home.'
};
