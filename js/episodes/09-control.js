/**
 * Season 5 Episode 9 — Control
 * Public plot: Mutilated man found; initially appears a victim. Investigation reveals he abducted women and held them as "brides" in a dungeon.
 * One prior report from a victim had been disbelieved years earlier, creating a heavy personal cost for the detective involved.
 */

export default {
  number: 9,
  title: 'Control',
  overview: `A severely mutilated man is found after being seen stumbling through a subway station. What begins as a victim case reverses when evidence shows he had abducted women and held them captive for years. A prior report from one of those women had been made years earlier and was not fully credited at the time — a failure that now carries direct consequences for the investigation and for the detective who handled it.`,

  evidence: [
    {
      id: 'mutilation',
      name: 'Victim’s Injuries & Recovery',
      type: 'Physical',
      description: 'Extreme genital mutilation and blood loss. Initial framing is of a stranger attack on a vulnerable man.',
      unlocks: ['apparent-victim']
    },
    {
      id: 'dungeon',
      name: 'Captivity Location',
      type: 'Physical',
      description: 'Search of the man’s residence and related spaces reveals a controlled environment used to hold women against their will for extended periods.',
      unlocks: ['captivity-confirmed']
    },
    {
      id: 'prior-report',
      name: 'Old Complaint File',
      type: 'Document',
      description: 'Years earlier a woman reported being held by this man. The report was not fully pursued or believed at the time.',
      unlocks: ['prior-miss']
    },
    {
      id: 'survivors',
      name: 'Statements from Surviving Captives',
      type: 'Testimony',
      description: 'Women describe the methods of control, the duration of captivity, and the psychological conditions imposed.',
      unlocks: ['survivor-accounts']
    }
  ],

  suspects: [
    {
      id: 'gorman',
      name: 'Mr. Gorman',
      role: 'Apparent victim → Primary offender',
      intro: 'First encountered as a mutilated man in need of medical care. Evidence rapidly reclassifies him as the long-term abductor.',
      questions: [
        {
          id: 'q1',
          prompt: 'Who attacked you and why?',
          response: 'Early statements position him as a victim. Inconsistencies grow as physical evidence from the captivity site accumulates.',
          points: 5,
          unlocks: ['initial-claim']
        },
        {
          id: 'q2',
          prompt: 'Explain the rooms and restraints found at your property.',
          response: 'Denial collapses under the physical layout and survivor statements.',
          points: 15,
          requires: ['captivity-confirmed', 'survivor-accounts'],
          unlocks: ['suspect:gorman']
        }
      ]
    },
    {
      id: 'prior-victim',
      name: 'Earlier Reporting Victim',
      role: 'Woman whose prior complaint was not fully credited',
      intro: 'Had tried to report the captivity years before. The handling of that report is now under painful review.',
      questions: [
        {
          id: 'q1',
          prompt: 'Describe what you reported and what response you received at the time.',
          response: 'She details the attempt to get help and the disbelief or insufficient action that followed. The cost of that failure is now visible.',
          points: 12,
          requires: ['prior-miss'],
          unlocks: ['system-failure']
        }
      ]
    }
  ],

  stages: [
    {
      id: 'reframe',
      title: 'Victim or Offender?',
      narrative: 'The man on the gurney looks like a victim. The physical evidence at his premises says otherwise.',
      choices: [
        {
          label: 'Continue treating him primarily as a victim while the search continues',
          result: 'Delays the correct framing and the protection of any remaining captives.',
          points: -8
        },
        {
          label: 'Secure the premises and reclassify him as the primary suspect based on the captivity evidence',
          result: 'Correct and urgent pivot. Opens the path to locating and supporting survivors.',
          points: 15,
          requires: ['captivity-confirmed'],
          unlocks: ['correct-frame']
        }
      ]
    },
    {
      id: 'accountability',
      title: 'The Prior Report',
      narrative: 'A woman tried to sound the alarm years ago. The system — and a specific detective — did not fully act. That history is now part of the case.',
      choices: [
        {
          label: 'Acknowledge the prior failure, support the earlier victim, and ensure the current case is built without repeating the mistake',
          result: 'Honest reckoning. Strengthens the present case and begins to address the earlier harm.',
          points: 15,
          requires: ['system-failure'],
          conclude: true
        },
        {
          label: 'Focus narrowly on the current crimes and treat the old report as background only',
          result: 'Prosecutes the present offenses but leaves the institutional and personal failure largely unexamined.',
          points: 5,
          conclude: true
        }
      ]
    }
  ],

  goodEnding: 'You correctly reclassified the apparent victim, secured the captivity evidence and survivors, and confronted the cost of the earlier disbelieved report.',
  partialEnding: 'You identified the true offender and the captivity but did not fully engage with the prior reporting failure.',
  poorEnding: 'The investigation stayed too long in the “victim” framing or minimized the significance of the earlier missed complaint.'
};
