/**
 * Season 5 Episode 7 — Choice
 * Public plot: Man attacks his pregnant wife over her drinking. He then seeks to have her charged for endangering the fetus.
 * Investigation reveals this is not the first child exposed to her alcoholism and fetal alcohol risk.
 */

export default {
  number: 7,
  title: 'Choice',
  overview: `Police interrupt an assault in progress: a man is attacking his pregnant wife. He claims he was trying to stop her from drinking and later petitions the system to charge her with endangering the unborn child. The investigation expands when it becomes clear an earlier child was also exposed to the same pattern of alcohol use during pregnancy.`,

  evidence: [
    {
      id: 'assault',
      name: 'Assault Report & Scene',
      type: 'Physical',
      description: 'Husband arrested for attacking his pregnant wife. He frames the violence as an attempt to protect the fetus from alcohol.',
      unlocks: ['domestic-call']
    },
    {
      id: 'alcohol',
      name: 'Toxicology & Witness Accounts of Drinking',
      type: 'Medical',
      description: 'Evidence of ongoing alcohol use by the mother during the current pregnancy. Pattern is not isolated.',
      unlocks: ['current-use']
    },
    {
      id: 'prior-child',
      name: 'Records on Earlier Child',
      type: 'Document',
      description: 'Prior pregnancy and child show indicators consistent with fetal alcohol exposure. History of the mother’s drinking during that pregnancy is documented.',
      unlocks: ['prior-exposure']
    },
    {
      id: 'family-court',
      name: 'Husband’s Legal Filing',
      type: 'Document',
      description: 'Husband seeks to have the mother charged or restricted based on risk to the fetus. Raises complex questions about fetal rights and parental autonomy.',
      unlocks: ['legal-conflict']
    }
  ],

  suspects: [
    {
      id: 'husband',
      name: 'Husband / Father',
      role: 'Arrested for assault; petitioner against the mother',
      intro: 'Uses the assault arrest as a platform to push for legal intervention against the mother’s drinking.',
      questions: [
        {
          id: 'q1',
          prompt: 'Describe what happened the night of the assault.',
          response: 'He admits the physical act but insists the motive was stopping alcohol use that would harm the baby.',
          points: 6,
          unlocks: ['motive-claimed']
        },
        {
          id: 'q2',
          prompt: 'Why pursue charges or restrictions against the mother now?',
          response: 'He cites the risk of fetal alcohol spectrum issues and points to the condition of the earlier child.',
          points: 10,
          requires: ['prior-exposure'],
          unlocks: ['prior-known']
        }
      ]
    },
    {
      id: 'mother',
      name: 'Pregnant Wife / Mother',
      role: 'Victim of the assault; subject of the endangerment claim',
      intro: 'Denies or minimizes the extent of her drinking. History with the earlier child becomes the critical pressure point.',
      questions: [
        {
          id: 'q1',
          prompt: 'How much have you been drinking during this pregnancy?',
          response: 'Initial minimization. Collateral evidence and medical indicators contradict a clean account.',
          points: 5,
          unlocks: ['minimizing']
        },
        {
          id: 'q2',
          prompt: 'What happened during the previous pregnancy regarding alcohol?',
          response: 'Under sustained questioning the pattern of use and its consequences for the first child become clearer.',
          points: 12,
          requires: ['prior-exposure'],
          unlocks: ['pattern-acknowledged']
        }
      ]
    }
  ],

  stages: [
    {
      id: 'immediate',
      title: 'The Assault vs the Pregnancy Risk',
      narrative: 'You have a clear domestic assault. The husband wants the system to treat the mother’s drinking as the primary crime against the fetus.',
      choices: [
        {
          label: 'Charge the assault fully and treat the pregnancy-risk claims as a separate civil/family matter',
          result: 'Keeps the criminal case clean. Leaves the fetal-endangerment question to other forums.',
          points: 8,
          unlocks: ['assault-priority']
        },
        {
          label: 'Explore whether criminal endangerment charges against the mother are viable under current law',
          result: 'Enters a legally and ethically contested area. Requires careful documentation of knowledge and risk.',
          points: 10,
          unlocks: ['endangerment-path']
        }
      ]
    },
    {
      id: 'history',
      title: 'The Earlier Child',
      narrative: 'Evidence of prior exposure is strong. How central should that history be to the current response?',
      choices: [
        {
          label: 'Use the prior history primarily to support protective measures and treatment conditions for the current pregnancy',
          result: 'Focuses on harm reduction for the unborn child while the assault case proceeds.',
          points: 12,
          requires: ['prior-exposure'],
          conclude: true
        },
        {
          label: 'Push for the strongest available criminal and family-court consequences based on the repeated pattern',
          result: 'Maximizes accountability and restriction. Higher risk of legal challenge on fetal-rights grounds.',
          points: 10,
          requires: ['pattern-acknowledged'],
          conclude: true
        }
      ]
    }
  ],

  goodEnding: 'You held the assault accountable, documented the ongoing risk pattern carefully, and framed interventions that addressed both the violence and the repeated exposure of children to alcohol during pregnancy.',
  partialEnding: 'You resolved the immediate assault but under-developed the prior history or the practical protective options for the current pregnancy.',
  poorEnding: 'The case was treated as a one-off domestic incident without meaningful engagement with the fetal-alcohol risk pattern.'
};
