import type { NextApiRequest, NextApiResponse } from 'next';
import type { Category } from '../../src/types';

const value: Category = {
  id: '2NfeV8v5VfnJeDhQqFl8',
  title: 'Delivering Value',
  description: {
    positive: 'We deliver great stuff! We\'re proud of it and our stakeholders are really happy.',
    negative: 'We do not deliver value to our stakeholders. We feel ashamed of our work.',
  },
};

const speed: Category = {
  id: '33YmhdcR9aZR0c2KjjSy',
  title: 'Speed',
  description: {
    positive: 'We get stuff done really quickly, no waiting around and no unnecessary delays.',
    negative: 'We never seem to get anything done. We keep getting stuck or interrupted.',
  },
};

const teamwork: Category = {
  id: '8jhsNRqf01QuPGsLOOPy',
  title: 'Teamwork',
  description: {
    positive: 'We are a totally gelled super-team with awesome collaboration and alignment.',
    negative: 'We are a bunch of individuals that do not know what others in the squad are doing.',
  },
};

const support: Category = {
  id: 'B9k4sqomqI3ukdPZbuYX',
  title: 'Support',
  description: {
    positive: 'We always get great support and help when we ask for it which keeps us going.',
    negative: 'We keep getting stuck because we can\'t get the help and support that we need.',
  },
};

const fun: Category = {
  id: 'G3Kj5ls8xqAZQoRZ3YsB',
  title: 'Fun',
  description: {
    positive: 'We love going to work and have lots of fun working together.',
    negative: 'I don\'t like going to work and it\'s not much fun working here.',
  },
};

const release: Category = {
  id: 'GvnxeOzZhi8scJAhEVPp',
  title: 'Easy to Release',
  description: {
    positive: 'Releasing is simple, safe, painless and mostly automated.',
    negative: 'Releasing is risky, painful, requires manual work and takes forever.',
  },
};

const process: Category = {
  id: 'IQ37eBNDQDPzGeg3iJGH',
  title: 'Suitable Process',
  description: {
    positive: 'Our way of working fits us perfectly.',
    negative: 'Our way of working does not suit us.',
  },
};

const autonomy: Category = {
  id: 'JXFZuf9dbO6A0jHbFaie',
  title: 'Autonomy',
  description: {
    positive: 'We are in control of our destiny. We know exactly what to build and how to build it.',
    negative: 'We\'re just pawns in a game of chess with no influence of what we build or how we build.',
  },
};

const codeQuality: Category = {
  id: 'NQFGPojMAqR3tRFnf9jL',
  title: 'Code Quality',
  description: {
    positive: 'We are proud of our code. It\'s clean, easy to read and has great test coverage.',
    negative: 'Our code is a pile of dung and technical debt is raging out of control.',
  },
};

const learning: Category = {
  id: 'p6m3Ivm9uCRGJmKQNe8X',
  title: 'Learning',
  description: {
    positive: 'We are learning lots of interesting stuff all the time.',
    negative: 'We never have the time to learn any new tech, skills, or methods.',
  },
};

const mission: Category = {
  id: 'zgnnvzenFKOoShA6e11q',
  title: 'Mission',
  description: {
    positive: 'We know exactly why we are here and we\'re really excited about it.',
    negative: 'There is no high-level picture or focus. Our so called mission is uninspiring and unclear.',
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Category>>,
) {
  res.status(200).json([
    value,
    speed,
    teamwork,
    support,
    fun,
    release,
    process,
    autonomy,
    codeQuality,
    learning,
    mission,
  ]);
};
