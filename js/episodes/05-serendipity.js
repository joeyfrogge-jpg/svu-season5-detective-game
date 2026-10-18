/**
 * Season 5 Episode 5 — Serendipity
 * Public plot: Dead newborn found; mother also murdered. Dermatologist initially suspected via paternity claim.
 * DNA and further work reveal he is linked to a series of child sexual assaults ("Honey Rapist"). New ADA Casey Novak is introduced.
 */

export default {
  number: 5,
  title: 'Serendipity',
  overview: `A newborn is found dead in a sewer. The mother is soon located — also murdered after being forced to give birth. A dermatologist connected to the planned adoption becomes a person of interest. Paternity testing and deeper forensic work unexpectedly link him to a series of prior assaults on young girls, while the new ADA begins working with the squad.`,

  evidence: [
    {
      id: 'infant',
      name: 'Infant Recovery',
      type: 'Physical',
      description: 'Newborn recovered from a sewer location. Cause of death consistent with trauma and blood loss related to birth circumstances.',
      unlocks: ['infant-case']
    },
    {
      id: 'mother-scene',
      name: 'Mother’s Apartment',
      type: 'Physical',
      description: 'Mother found deceased. Evidence indicates she was forced through labor. Adoption arrangements were in progress.',
      unlocks: ['forced-birth']
    },
    {
      id: 'adoption',
      name: 'Adoption Paperwork & Payments',
      type: 'Document',
      description: 'Prospective adoptive parents had been covering medical costs. Doctor involved in the pregnancy care is identified.',
      unlocks: ['doctor-link']
    },
    {
      id: 'paternity',
      name: 'Paternity Test Results',
      type: 'Forensic',
      description: 'Initial result appears to exclude the doctor. Further examination of how the sample was obtained raises red flags.',
      unlocks: ['sample-anomaly']
    },
    {
      id: 'cold-case-dna',
      name: 'Cold Case DNA Match',
      type: 'Forensic',
      description: 'Doctor’s DNA profile matches evidence from prior unsolved sexual assaults on children involving a distinctive modus operandi.',
      unlocks: ['serial-link']
    }
  ],

  suspects: [
    {
      id: 'newlands',
      name: 'Dr. Archibald Newlands',
      role: 'Dermatologist / Person of interest',
      intro: 'Connected to the mother’s prenatal care and the adoption plan. Becomes the focus once forensic links emerge.',
      questions: [
        {
          id: 'q1',
          prompt: 'Explain your relationship to the deceased mother and the planned adoption.',
          response: 'He presents a professional, limited involvement. Financial and personal details require more scrutiny.',
          points: 5,
          unlocks: ['doctor-statement']
        },
        {
          id: 'q2',
          prompt: 'How was the blood sample for the paternity test obtained?',
          response: 'His account of the sampling process does not fully withstand forensic review of possible substitution methods.',
          points: 12,
          requires: ['sample-anomaly'],
          unlocks: ['sample-tamper-suspected']
        },
        {
          id: 'q3',
          prompt: 'Account for the DNA match to the earlier child assault cases.',
          response: 'Denial. The forensic linkage is strong and shifts the entire case focus.',
          points: 15,
          requires: ['serial-link'],
          unlocks: ['suspect:newlands']
        }
      ]
    },
    {
      id: 'adoptive',
      name: 'Prospective Adoptive Parents',
      role: 'Civilians in the adoption process',
      intro: 'Had been preparing to adopt the child. Their payments and knowledge of the doctor become relevant.',
      questions: [
        {
          id: 'q1',
          prompt: 'Describe your arrangement with the mother and the doctor.',
          response: 'They appear genuine in their desire to adopt. Their information helps map the financial and medical connections.',
          points: 6,
          unlocks: ['adoption-details']
        }
      ]
    },
    {
      id: 'novak',
      name: 'ADA Casey Novak',
      role: 'Newly assigned ADA',
      intro: 'Taking over SVU prosecutions. Still calibrating how to work with the detectives’ methods.',
      questions: [
        {
          id: 'q1',
          prompt: 'How do you want to prioritize the murder case versus the emerging serial assault link?',
          response: 'She is aggressive on the forensic matches and wants clean, prosecutable counts on both tracks.',
          points: 8,
          requires: ['serial-link']
        }
      ]
    }
  ],

  stages: [
    {
      id: 'initial-focus',
      title: 'Murder vs Paternity',
      narrative: 'Early theory centers on the doctor as a possible father who silenced the mother. The paternity result complicates that theory.',
      choices: [
        {
          label: 'Accept the paternity exclusion and look for a different father/suspect',
          result: 'Risk of missing the sample integrity issue and the larger serial pattern.',
          points: -5
        },
        {
          label: 'Scrutinize how the comparison sample was collected and run broader DNA checks',
          result: 'Opens the path to the cold-case matches and the true scope of the offender’s activity.',
          points: 15,
          requires: ['sample-anomaly'],
          unlocks: ['forensic-deep-dive']
        }
      ]
    },
    {
      id: 'serial-scope',
      title: 'Expanding the Case',
      narrative: 'The doctor is now linked to prior child assaults. How do you structure the investigation and charging decisions?',
      choices: [
        {
          label: 'Prioritize the current double homicide and treat the older cases as supporting evidence',
          result: 'Focused but may under-utilize the strength of the serial pattern.',
          points: 8,
          conclude: true
        },
        {
          label: 'Build a comprehensive case that includes both the murders and the pattern of prior assaults',
          result: 'More complex prosecution, stronger overall accountability if the forensic links hold.',
          points: 15,
          requires: ['serial-link', 'suspect:newlands'],
          conclude: true
        }
      ]
    }
  ],

  goodEnding: 'You questioned the paternity sample integrity, followed the DNA into the cold cases, and framed a case that addressed both the current murders and the longer pattern of assaults.',
  partialEnding: 'You connected the doctor to the current case but did not fully develop the serial assault dimension.',
  poorEnding: 'The investigation accepted the initial paternity result at face value or failed to pursue the forensic anomalies that revealed the larger crimes.'
};
