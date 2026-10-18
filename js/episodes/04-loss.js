/**
 * Season 5 Episode 4 — Loss
 * Public plot: Undercover DEA agent raped and murdered. Cartel connection.
 * ADA Cabot refuses to drop the case despite threats; she becomes a target and is forced into witness protection (appearing to die).
 */

export default {
  number: 4,
  title: 'Loss',
  overview: `An undercover federal agent is found raped and murdered. The investigation leads to a powerful Colombian cartel figure. While building the case, ADA Alexandra Cabot comes under direct threat. Despite pressure from federal authorities and escalating danger to herself and her family, she continues to push the prosecution — with devastating personal consequences.`,

  evidence: [
    {
      id: 'body',
      name: 'Victim Recovery',
      type: 'Physical',
      description: 'Undercover agent’s body recovered under circumstances designed to send a message. Identity initially obscured.',
      unlocks: ['federal-victim']
    },
    {
      id: 'dea-id',
      name: 'Federal Identity Confirmation',
      type: 'Document',
      description: 'Victim confirmed as an active undercover DEA agent. Other agents’ identities must be protected during the investigation.',
      unlocks: ['protect-identities']
    },
    {
      id: 'cartel-link',
      name: 'Cartel Connection',
      type: 'Intelligence',
      description: 'Evidence and informant information point to Rafael Zapata, a high-level operative tied to a major international drug organization.',
      unlocks: ['zapata-suspect']
    },
    {
      id: 'threats',
      name: 'Threat Communications',
      type: 'Communication',
      description: 'Credible threats directed at the prosecuting ADA and her family surface as the case advances.',
      unlocks: ['ada-threatened']
    },
    {
      id: 'ci',
      name: 'Confidential Informant',
      type: 'Testimony',
      description: 'Informant provides critical linkage between the murder and the cartel hierarchy, at significant personal risk.',
      unlocks: ['informant-active']
    }
  ],

  suspects: [
    {
      id: 'zapata',
      name: 'Rafael Zapata',
      role: 'Cartel operative',
      intro: 'Primary suspect in the agent’s murder. Highly connected and insulated by the organization he serves.',
      questions: [
        {
          id: 'q1',
          prompt: 'Account for your movements around the time of the murder.',
          response: 'He provides a controlled, lawyered narrative. Gaps exist but are difficult to exploit without exposing other sources.',
          points: 5,
          unlocks: ['zapata-alibi']
        },
        {
          id: 'q2',
          prompt: 'What is your relationship to the larger organization and Cesar Velez?',
          response: 'He minimizes or denies. Intelligence and the informant tell a different story.',
          points: 10,
          requires: ['cartel-link', 'informant-active'],
          unlocks: ['hierarchy-mapped']
        }
      ]
    },
    {
      id: 'dea-contact',
      name: 'DEA Liaison',
      role: 'Federal partner',
      intro: 'Coordinates with SVU while protecting ongoing undercover operations and other agent identities.',
      questions: [
        {
          id: 'q1',
          prompt: 'How much operational detail can you share without compromising other agents?',
          response: 'Limited. The tension between solving this murder and protecting the larger investigation is constant.',
          points: 8,
          requires: ['protect-identities']
        }
      ]
    },
    {
      id: 'cabot',
      name: 'ADA Alexandra Cabot',
      role: 'Prosecuting attorney',
      intro: 'Determined to prosecute despite escalating personal risk. Becomes a direct target of the cartel.',
      questions: [
        {
          id: 'q1',
          prompt: 'Are you prepared to continue if the threats escalate further?',
          response: 'She is resolute. Family safety and professional duty are in direct conflict.',
          points: 10,
          requires: ['ada-threatened'],
          unlocks: ['cabot-resolute']
        }
      ]
    }
  ],

  stages: [
    {
      id: 'jurisdiction',
      title: 'Federal vs Local Control',
      narrative: 'Federal authorities prefer to absorb or delay the case to protect larger operations. Cabot wants to proceed on the murder.',
      choices: [
        {
          label: 'Yield primary control to federal authorities',
          result: 'Safer for the ADA short-term, but the local murder case loses momentum.',
          points: 0,
          unlocks: ['federal-lead']
        },
        {
          label: 'Keep the murder prosecution moving while coordinating carefully with DEA',
          result: 'Higher personal risk, stronger chance of accountability for the agent’s death.',
          points: 12,
          unlocks: ['local-push']
        }
      ]
    },
    {
      id: 'threat-response',
      title: 'Responding to the Threats',
      narrative: 'Credible threats against Cabot and her family are now active. The cartel is signaling that the prosecution itself is the target.',
      choices: [
        {
          label: 'Increase protection but keep Cabot on the case',
          result: 'She remains the face of the prosecution. Risk continues to climb.',
          points: 10,
          requires: ['cabot-resolute'],
          unlocks: ['protection-up']
        },
        {
          label: 'Recommend she step back and let another ADA take over',
          result: 'Reduces immediate personal danger but may signal weakness to the cartel.',
          points: 5
        },
        {
          label: 'Push for rapid indictment and custody of Zapata to reduce the threat window',
          result: 'Aggressive timeline. Creates the conditions that ultimately force the extreme protective measures that follow.',
          points: 15,
          requires: ['zapata-suspect', 'local-push'],
          conclude: true
        }
      ]
    }
  ],

  goodEnding: 'You balanced federal constraints with the need for local accountability, supported the decision to keep pressure on the cartel figure, and recognized the personal cost that followed for the ADA.',
  partialEnding: 'You identified the cartel link and the threat environment but hesitated on the aggressive timeline or protection posture.',
  poorEnding: 'The investigation deferred too quickly to federal control or failed to treat the threats against the prosecutor as an integral part of the case.'
};
