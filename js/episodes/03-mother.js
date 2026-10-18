/**
 * Season 5 Episode 3 — Mother
 * Public plot: Forensic psychiatrist found assaulted. Doctor-patient confidentiality blocks access.
 * Investigation links to one of her patients, unconventional therapy methods, and a deeper family secret involving the true relationship between two key figures.
 */

export default {
  number: 3,
  title: 'Mother',
  overview: `A forensic psychiatrist who treats sex offenders is found brutally assaulted. Doctor-patient confidentiality severely limits the investigation. Early focus falls on her patients, but evidence and a recovered therapy recording shift attention to unconventional treatment methods and a complex family dynamic that ultimately reveals a long-hidden relationship and an unsolved homicide.`,

  evidence: [
    {
      id: 'scene',
      name: 'Assault Scene',
      type: 'Physical',
      description: 'Psychiatrist found bound and severely beaten in a location linked to known offenders. Presence of additional individuals at the scene complicates the initial picture.',
      unlocks: ['patient-suspect-pool']
    },
    {
      id: 'records-missing',
      name: 'Missing Patient Files',
      type: 'Document',
      description: 'Key patient records disappear after the doctor leaves the hospital. Office vandalism is confirmed around the same time.',
      unlocks: ['records-tampered']
    },
    {
      id: 'therapy-tape',
      name: 'Recovered Therapy Recording',
      type: 'Audio',
      description: 'A tape provided by a relative of a patient contains highly unconventional therapeutic language. Raises serious questions about professional boundaries.',
      unlocks: ['boundary-concerns']
    },
    {
      id: 'family-history',
      name: 'Family Background Check',
      type: 'Background',
      description: 'Reveals a history of severe abuse within the patient’s family and an earlier unsolved death of a relative.',
      unlocks: ['prior-homicide']
    },
    {
      id: 'witness-dealer',
      name: 'Street Source Statement',
      type: 'Testimony',
      description: 'A source places one of the patient’s relatives near the assault location around the critical time window.',
      unlocks: ['relative-at-scene']
    }
  ],

  suspects: [
    {
      id: 'patient',
      name: 'Robert Logan',
      role: 'Patient of the psychiatrist',
      intro: 'A patient under the doctor’s care. Early indicators point toward him, but his condition and the therapy itself become central issues.',
      questions: [
        {
          id: 'q1',
          prompt: 'Describe your relationship with Dr. Heints.',
          response: 'His account is heavily colored by the therapy. He expresses intense attachment that goes beyond typical clinical bounds.',
          points: 8,
          unlocks: ['attachment-noted']
        },
        {
          id: 'q2',
          prompt: 'What happened the night of the assault?',
          response: 'His memory and narrative are unreliable. Physical evidence and other statements do not fully align.',
          points: 5,
          requires: ['patient-suspect-pool']
        }
      ]
    },
    {
      id: 'christina',
      name: 'Christina',
      role: 'Relative of the patient / Clinic employee',
      intro: 'Presents as a protective sibling. Holds strong negative views of the psychiatrist’s methods and provides the therapy recording.',
      questions: [
        {
          id: 'q1',
          prompt: 'Why did you bring the therapy tape to police?',
          response: 'She frames it as exposing harmful treatment. Her anger toward the doctor is intense and personal.',
          points: 8,
          unlocks: ['boundary-concerns']
        },
        {
          id: 'q2',
          prompt: 'Where were you when the assault occurred?',
          response: 'Her initial account has gaps. Cross-check with the street source creates significant problems for her timeline.',
          points: 12,
          requires: ['relative-at-scene'],
          unlocks: ['suspect:christina']
        },
        {
          id: 'q3',
          prompt: 'Tell us about the abuse history in your family and the death of your mother.',
          response: 'Under pressure she reveals the true nature of her relationship to Robert and the motive behind the earlier killing.',
          points: 15,
          requires: ['prior-homicide', 'suspect:christina'],
          unlocks: ['true-relationship']
        }
      ]
    },
    {
      id: 'doctor',
      name: 'Dr. Greta Heints',
      role: 'Victim / Treating psychiatrist',
      intro: 'Reluctant to cooperate fully, citing confidentiality. Her therapeutic approach becomes a major point of contention.',
      questions: [
        {
          id: 'q1',
          prompt: 'Explain the methods used in the recovered recording.',
          response: 'She defends the approach as an attempt to create a corrective maternal dynamic. The explanation raises more professional concerns than it resolves.',
          points: 10,
          requires: ['boundary-concerns']
        }
      ]
    }
  ],

  stages: [
    {
      id: 'confidentiality',
      title: 'Confidentiality Barrier',
      narrative: 'The victim will not release patient information. How do you progress without violating legal and ethical constraints?',
      choices: [
        {
          label: 'Push hard for records despite the doctor’s refusal',
          result: 'Creates legal friction and risks tainting later evidence.',
          points: -5
        },
        {
          label: 'Work around confidentiality using physical evidence, the recovered tape, and third-party statements',
          result: 'Slower but cleaner path. Unlocks critical leads without direct breach.',
          points: 12,
          unlocks: ['clean-path']
        }
      ]
    },
    {
      id: 'true-motive',
      title: 'Revealing the Real Relationship',
      narrative: 'Evidence now points strongly at the relative. The family history and the unsolved death are ready to be confronted.',
      choices: [
        {
          label: 'Confront Christina with the scene evidence and the prior homicide',
          result: 'She breaks and reveals the true parent-child relationship and the protective motive behind both the assault and the earlier killing.',
          points: 15,
          requires: ['true-relationship', 'suspect:christina'],
          conclude: true
        },
        {
          label: 'Focus the case primarily on the psychiatrist’s methods',
          result: 'Addresses professional misconduct but leaves the violent acts and family secret incompletely resolved.',
          points: 5,
          conclude: true
        }
      ]
    }
  ],

  goodEnding: 'You navigated the confidentiality barrier cleanly, used the tape and third-party evidence effectively, and uncovered the true family relationship that explained both the assault and the earlier homicide.',
  partialEnding: 'You identified key players and the boundary issues but did not fully resolve the deeper family secret or the prior killing.',
  poorEnding: 'The investigation remained stuck on the most obvious patient or became mired in the confidentiality fight without developing the relative’s role.'
};
