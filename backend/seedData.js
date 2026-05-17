// Seed course data — copied from frontend LMSContext to populate the database on first run.
// Once seeded, all management happens through the API / admin panel.

const courses = [
  {
    id: 'intro-psychology',
    title: 'Introduction to Psychology',
    icon: '🧠',
    category: 'psychology',
    instructor_id: 'priya-sharma',
    duration: '6 Weeks',
    lessons_count: 12,
    level: 'Beginner',
    price: 0,
    enrolled: 234,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Explore the fundamentals of human psychology, covering key theories, mental processes, and behavioral patterns. Perfect for beginners who want to understand the human mind.',
    whatYouLearn: [
      'Core principles of psychology and how the mind works',
      'Major schools of thought — Behaviorism, Cognitive, Humanistic',
      'Understanding emotions, memory, and perception',
      'Basics of psychological assessment and research methods',
    ],
    modules: [
      {
        title: 'Foundations of Psychology',
        lessons: [
          { id: 'ip-1', title: 'What is Psychology?', type: 'video', duration: '12 min', videoUrl: 'https://www.youtube.com/embed/vo4pMVb0R6M', content: 'Psychology is the scientific study of the mind and behavior. In this lesson, we explore its history, key figures, and why understanding psychology matters in everyday life.' },
          { id: 'ip-2', title: 'History & Schools of Thought', type: 'video', duration: '15 min', videoUrl: 'https://www.youtube.com/embed/wuhJ-GkRRQc', content: 'From Freud\'s psychoanalysis to modern cognitive psychology — trace the evolution of psychological thinking.' },
          { id: 'ip-3', title: 'Research Methods in Psychology', type: 'text', duration: '10 min', videoUrl: null, content: 'Psychology relies on scientific methods including experiments, case studies, surveys, and observational studies. Understanding these methods is essential for evaluating psychological claims.' },
        ],
        quiz: {
          title: 'Foundations Quiz',
          passingScore: 60,
          questions: [
            { question: 'What is the primary focus of psychology?', options: ['The study of plants', 'The scientific study of mind and behavior', 'The study of physical health only', 'The study of computers'], correctAnswer: 1, explanation: 'Psychology is defined as the scientific study of the mind and behavior.' },
            { question: 'Which research method establishes cause-and-effect relationships?', options: ['Survey', 'Case study', 'Experimental method', 'Observational study'], correctAnswer: 2, explanation: 'The experimental method manipulates variables to establish causation.' },
            { question: 'Who founded psychoanalysis?', options: ['B.F. Skinner', 'Sigmund Freud', 'Carl Rogers', 'Wilhelm Wundt'], correctAnswer: 1, explanation: 'Sigmund Freud founded psychoanalysis in the late 19th century.' },
          ],
        },
      },
      {
        title: 'Understanding the Mind',
        lessons: [
          { id: 'ip-4', title: 'Sensation & Perception', type: 'video', duration: '14 min', videoUrl: 'https://www.youtube.com/embed/unWnZvXJH2o', content: 'How do we process the world around us? Learn the difference between sensation and perception, and how our brain interprets sensory information.' },
          { id: 'ip-5', title: 'Memory & Learning', type: 'video', duration: '16 min', videoUrl: 'https://www.youtube.com/embed/bSycdIx-C48', content: 'Explore how memories are formed, stored, and retrieved. Understand different types of memory and effective learning strategies.' },
          { id: 'ip-6', title: 'Emotions & Motivation', type: 'text', duration: '12 min', videoUrl: null, content: 'Emotions are complex psychological states involving subjective experience, physiological response, and behavioral expression. Explore theories by James-Lange, Cannon-Bard, and Schachter-Singer.' },
        ],
        quiz: {
          title: 'Mind & Memory Quiz',
          passingScore: 60,
          questions: [
            { question: 'What is the difference between sensation and perception?', options: ['They mean the same thing', 'Sensation receives stimuli, perception interprets them', 'Perception comes first', 'Sensation only happens in the eyes'], correctAnswer: 1, explanation: 'Sensation is detecting stimuli; perception is interpreting them.' },
            { question: 'According to Maslow, what is at the top of the hierarchy of needs?', options: ['Food and water', 'Safety', 'Self-actualization', 'Love and belonging'], correctAnswer: 2, explanation: 'Self-actualization sits at the top of Maslow\'s hierarchy.' },
          ],
        },
      },
      {
        title: 'Personality & Development',
        lessons: [
          { id: 'ip-7', title: 'Personality Theories', type: 'video', duration: '15 min', videoUrl: 'https://www.youtube.com/embed/YbJOTdZBX1g', content: 'From Freud\'s id-ego-superego to the Big Five personality traits — explore different approaches to understanding what makes each person unique.' },
          { id: 'ip-8', title: 'Human Development', type: 'video', duration: '13 min', videoUrl: 'https://www.youtube.com/embed/4p60gGhCgwA', content: 'Trace psychological development from infancy through old age. Learn about key developmental milestones.' },
          { id: 'ip-9', title: 'Social Psychology Basics', type: 'text', duration: '11 min', videoUrl: null, content: 'Social psychology examines how we think about, influence, and relate to others. Key concepts include conformity, obedience, attribution, and cognitive dissonance.' },
        ],
      },
      {
        title: 'Applied Psychology',
        lessons: [
          { id: 'ip-10', title: 'Psychological Disorders Overview', type: 'video', duration: '18 min', videoUrl: 'https://www.youtube.com/embed/wuhJ-GkRRQc', content: 'An introduction to common psychological disorders including anxiety, depression, and personality disorders.' },
          { id: 'ip-11', title: 'Therapeutic Approaches', type: 'video', duration: '14 min', videoUrl: 'https://www.youtube.com/embed/qWfzV5TLhWY', content: 'Explore the major therapeutic approaches: CBT, psychodynamic therapy, humanistic therapy, and more.' },
          { id: 'ip-12', title: 'Psychology in Everyday Life', type: 'text', duration: '10 min', videoUrl: null, content: 'Psychology isn\'t just for therapists — it applies to every aspect of daily life. At work, in relationships, for self-growth, and in parenting.' },
        ],
      },
    ],
  },
  {
    id: 'hypnotherapy-cert',
    title: 'Hypnotherapy Certification',
    icon: '🌀',
    category: 'therapy',
    instructor_id: 'priya-sharma',
    duration: '8 Weeks',
    lessons_count: 10,
    level: 'Intermediate',
    price: 4999,
    enrolled: 156,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'A comprehensive course on clinical hypnotherapy techniques, ethical practice, and hands-on session methodology. Get CHI-Certified upon completion.',
    whatYouLearn: [
      'Clinical hypnotherapy induction techniques',
      'Understanding the subconscious mind',
      'Ethical practice and client management',
      'Hands-on session planning and execution',
    ],
    modules: [
      {
        title: 'Understanding Hypnotherapy',
        lessons: [
          { id: 'hc-1', title: 'What is Clinical Hypnotherapy?', type: 'video', duration: '15 min', videoUrl: 'https://www.youtube.com/embed/bMkMsFYVMKM', content: 'Clinical hypnotherapy is a therapeutic technique that uses guided relaxation and focused attention.' },
          { id: 'hc-2', title: 'The Subconscious Mind', type: 'video', duration: '18 min', videoUrl: 'https://www.youtube.com/embed/lBNlMSRjMjM', content: 'Explore the relationship between conscious and subconscious processes.' },
          { id: 'hc-3', title: 'History & Science Behind Hypnosis', type: 'text', duration: '12 min', videoUrl: null, content: 'Hypnosis has a rich history from ancient sleep temples to modern neuroscience. Modern fMRI studies confirm hypnosis affects brain activity.' },
        ],
        quiz: {
          title: 'Hypnotherapy Basics Quiz',
          passingScore: 70,
          questions: [
            { question: 'How does clinical hypnotherapy differ from stage hypnosis?', options: ['It uses no induction', 'It is a therapeutic, evidence-based practice', 'It only works on willing subjects', 'They are the same'], correctAnswer: 1, explanation: 'Clinical hypnotherapy is a therapeutic technique with evidence-based applications.' },
            { question: 'Who revolutionized indirect hypnotherapy?', options: ['Franz Mesmer', 'James Braid', 'Milton Erickson', 'Sigmund Freud'], correctAnswer: 2, explanation: 'Milton Erickson developed indirect, conversational hypnotherapy techniques.' },
          ],
        },
      },
      {
        title: 'Induction Techniques',
        lessons: [
          { id: 'hc-4', title: 'Progressive Relaxation Method', type: 'video', duration: '20 min', videoUrl: 'https://www.youtube.com/embed/hEAVe-Yl1-A', content: 'The most widely used induction method. Learn to guide clients through systematic muscle relaxation.' },
          { id: 'hc-5', title: 'Ericksonian Indirect Methods', type: 'video', duration: '22 min', videoUrl: 'https://www.youtube.com/embed/rEHdBMUycwM', content: 'Milton Erickson\'s indirect approach uses stories, metaphors, and conversational techniques.' },
          { id: 'hc-6', title: 'Rapid & Instant Inductions', type: 'text', duration: '15 min', videoUrl: null, content: 'Advanced practitioners sometimes use rapid inductions that achieve hypnotic states in seconds to minutes.' },
        ],
      },
      {
        title: 'Clinical Practice',
        lessons: [
          { id: 'hc-7', title: 'Session Planning & Structure', type: 'video', duration: '16 min', videoUrl: 'https://www.youtube.com/embed/bMkMsFYVMKM', content: 'A well-structured session is key to effective hypnotherapy.' },
          { id: 'hc-8', title: 'Ethics & Client Management', type: 'video', duration: '14 min', videoUrl: 'https://www.youtube.com/embed/lBNlMSRjMjM', content: 'Ethical practice is paramount in hypnotherapy.' },
        ],
      },
      {
        title: 'Specializations',
        lessons: [
          { id: 'hc-9', title: 'Hypnotherapy for Anxiety & Stress', type: 'video', duration: '18 min', videoUrl: 'https://www.youtube.com/embed/hEAVe-Yl1-A', content: 'Learn specific protocols for treating anxiety disorders and stress management.' },
          { id: 'hc-10', title: 'Habit Change & Regression Therapy', type: 'text', duration: '16 min', videoUrl: null, content: 'Hypnotherapy is highly effective for habit change — smoking cessation, weight management, and behavioral patterns.' },
        ],
      },
    ],
  },
  {
    id: 'mindfulness-meditation',
    title: 'Mindfulness & Meditation',
    icon: '🧘',
    category: 'wellness',
    instructor_id: 'mindspa-team',
    duration: '5 Weeks',
    lessons_count: 8,
    level: 'Beginner',
    price: 0,
    enrolled: 412,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Practical techniques for cultivating mindfulness in daily life. Covers breathing exercises, body scans, and guided meditation for stress relief and inner peace.',
    whatYouLearn: [
      'Daily mindfulness practices you can start today',
      'Breathing techniques for stress and anxiety relief',
      'Body scan meditation for deep relaxation',
      'Building a sustainable meditation habit',
    ],
    modules: [
      {
        title: 'Getting Started with Mindfulness',
        lessons: [
          { id: 'mm-1', title: 'What is Mindfulness?', type: 'video', duration: '10 min', videoUrl: 'https://www.youtube.com/embed/w6T02g5hnT4', content: 'Mindfulness is the practice of paying attention to the present moment without judgment.' },
          { id: 'mm-2', title: 'Your First Meditation', type: 'video', duration: '12 min', videoUrl: 'https://www.youtube.com/embed/inpok4MKVLM', content: 'A gentle guided meditation for absolute beginners.' },
        ],
        quiz: {
          title: 'Mindfulness Basics',
          passingScore: 60,
          questions: [
            { question: 'Mindfulness is the practice of:', options: ['Emptying your mind', 'Paying attention to the present moment without judgment', 'Thinking positive thoughts', 'Achieving enlightenment'], correctAnswer: 1, explanation: 'Mindfulness is non-judgmental awareness of the present moment.' },
            { question: 'A busy mind during meditation means:', options: ['You are doing it wrong', 'You should give up', 'It is normal — gently return attention', 'You need more advanced techniques'], correctAnswer: 2, explanation: 'A wandering mind is normal — the practice is in returning attention.' },
          ],
        },
      },
      {
        title: 'Core Techniques',
        lessons: [
          { id: 'mm-3', title: 'Breathing Exercises', type: 'video', duration: '14 min', videoUrl: 'https://www.youtube.com/embed/tEmt1Znux58', content: 'Master the fundamentals: diaphragmatic breathing, 4-7-8 technique, box breathing, and alternate nostril breathing.' },
          { id: 'mm-4', title: 'Body Scan Meditation', type: 'video', duration: '18 min', videoUrl: 'https://www.youtube.com/embed/15q-N-_kkrU', content: 'The body scan is a powerful mindfulness practice that builds awareness of physical sensations.' },
          { id: 'mm-5', title: 'Walking Meditation', type: 'text', duration: '10 min', videoUrl: null, content: 'Meditation doesn\'t require sitting still. Walking meditation combines gentle movement with mindful awareness.' },
        ],
      },
      {
        title: 'Building a Practice',
        lessons: [
          { id: 'mm-6', title: 'Mindfulness in Daily Life', type: 'video', duration: '11 min', videoUrl: 'https://www.youtube.com/embed/w6T02g5hnT4', content: 'Learn to bring awareness to eating, commuting, working, and conversations.' },
          { id: 'mm-7', title: 'Dealing with a Busy Mind', type: 'video', duration: '13 min', videoUrl: 'https://www.youtube.com/embed/inpok4MKVLM', content: 'Learn practical strategies for working with thoughts, distractions, and resistance.' },
          { id: 'mm-8', title: 'Creating Your Routine', type: 'text', duration: '8 min', videoUrl: null, content: 'Consistency matters more than duration. A 5-minute daily practice is more powerful than an occasional hour-long session.' },
        ],
      },
    ],
  },
  {
    id: 'life-coaching',
    title: 'Life Coaching Essentials',
    icon: '🎯',
    category: 'coaching',
    instructor_id: 'priya-sharma',
    duration: '6 Weeks',
    lessons_count: 9,
    level: 'Intermediate',
    price: 2999,
    enrolled: 189,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Build coaching skills to help others achieve clarity, set goals, and create actionable plans for personal growth.',
    whatYouLearn: [
      'Core coaching frameworks and questioning techniques',
      'Goal-setting methodologies (SMART, GROW model)',
      'Active listening and powerful communication',
      'Building a coaching practice and client relationships',
    ],
    modules: [
      {
        title: 'Coaching Fundamentals',
        lessons: [
          { id: 'lc-1', title: 'What is Life Coaching?', type: 'video', duration: '14 min', videoUrl: 'https://www.youtube.com/embed/UY75MQte4RU', content: 'Life coaching is a collaborative process that helps individuals bridge the gap between where they are and where they want to be.' },
          { id: 'lc-2', title: 'The GROW Model', type: 'video', duration: '16 min', videoUrl: 'https://www.youtube.com/embed/K3iJIFPOJ98', content: 'The GROW model (Goal, Reality, Options, Way Forward) is the most widely used coaching framework.' },
          { id: 'lc-3', title: 'Active Listening Skills', type: 'text', duration: '12 min', videoUrl: null, content: 'Active listening is the foundation of effective coaching. It goes beyond hearing words to understanding meaning and emotions.' },
        ],
      },
      {
        title: 'Coaching Techniques',
        lessons: [
          { id: 'lc-4', title: 'Powerful Questions', type: 'video', duration: '15 min', videoUrl: 'https://www.youtube.com/embed/UY75MQte4RU', content: 'The right question can shift a client\'s entire perspective.' },
          { id: 'lc-5', title: 'Goal Setting & Accountability', type: 'video', duration: '14 min', videoUrl: 'https://www.youtube.com/embed/K3iJIFPOJ98', content: 'Help clients set meaningful goals and build accountability structures.' },
          { id: 'lc-6', title: 'Overcoming Client Resistance', type: 'text', duration: '13 min', videoUrl: null, content: 'Resistance is natural in coaching — it often signals that the client is approaching something meaningful.' },
        ],
      },
      {
        title: 'Building Your Practice',
        lessons: [
          { id: 'lc-7', title: 'Structuring a Coaching Session', type: 'video', duration: '16 min', videoUrl: 'https://www.youtube.com/embed/UY75MQte4RU', content: 'Learn the anatomy of an effective coaching session.' },
          { id: 'lc-8', title: 'Ethics & Boundaries', type: 'video', duration: '12 min', videoUrl: 'https://www.youtube.com/embed/K3iJIFPOJ98', content: 'Ethical coaching requires clear boundaries, confidentiality, and knowing when to refer.' },
          { id: 'lc-9', title: 'Starting Your Coaching Career', type: 'text', duration: '14 min', videoUrl: null, content: 'A practical roadmap for launching your coaching practice: get trained, practice, niche down, set up, price wisely.' },
        ],
      },
    ],
  },
  // ── MindSpa flagship: Diploma in Clinical Hypnotherapy (CHI-USA Certified) ──
  {
    id: 'diploma-clinical-hypnotherapy',
    title: 'Diploma in Clinical Hypnotherapy (CHI-USA Certified)',
    icon: '🌀',
    category: 'therapy',
    instructor_id: 'manju-agrawal',
    duration: '110 hours (Level I + II + III)',
    lessons_count: 35,
    level: 'Intermediate',
    price: 0,
    enrolled: 0,
    rating: 5.0,
    image: 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'A complete CHI-(USA) certified diploma program in Clinical Hypnotherapy across three progressive levels — Master Hypnotist, Master Hypnotherapist, and Clinical Hypnotherapist. Learn from internationally certified trainer Prof (Dr) Manju Agrawal in an in-person, hands-on training format.',
    whatYouLearn: [
      'Foundations of clinical hypnotherapy and the theory of mind',
      'Advanced techniques: Ericksonian, Kappasinian, NLP, regression, dream therapy',
      'Clinical applications for relationships, addictions, sexuality, eating disorders, and pain management',
      'How to set up, promote, and run a professional hypnotherapy practice',
    ],
    modules: [
      {
        title: 'Level I — Introduction to Clinical Hypnotherapy (20 hours, Master Hypnotist)',
        lessons: [
          { id: 'dch-l1-1', title: 'Introduction to Clinical Hypnotherapy', type: 'text', duration: '90 min', videoUrl: null, content: 'Understand how hypnosis complements therapeutic practice. Explore the brief history and evolution of hypnosis in therapeutic settings, and the development of the human mind — how belief systems and behaviours are formed and inherited.' },
          { id: 'dch-l1-2', title: 'The Theory of Mind & Suggestibility', type: 'text', duration: '120 min', videoUrl: null, content: 'Discover how the conscious and subconscious interact to influence emotions and actions. Understand how individuals respond to suggestions during hypnosis and the laws that shape effective, lasting therapeutic suggestions.' },
          { id: 'dch-l1-3', title: 'Creating the Hypnotic State & Conducting a Session', type: 'text', duration: '180 min', videoUrl: null, content: 'Master techniques to guide clients into a receptive, healing state. Step-by-step guidance on running effective sessions including deepening techniques and the wording of effective suggestions.' },
          { id: 'dch-l1-4', title: 'Post-Hypnotic Suggestions & Awakening', type: 'text', duration: '120 min', videoUrl: null, content: 'Plant lasting, positive suggestions that influence the subconscious. Safely guide clients back to full awareness, ensuring they feel grounded and refreshed.' },
          { id: 'dch-l1-5', title: 'Self-Hypnosis & Subconscious Reprogramming', type: 'text', duration: '120 min', videoUrl: null, content: 'Teach clients how to harness self-hypnosis for ongoing emotional balance. How to tap the subconscious mind, reach the root cause using diagnostic tools, and reprogram the SCM — delete old files and replace with new files. Many issues resolve in a single session.' },
        ],
        quiz: {
          title: 'Level I Assessment — Master Hypnotist',
          passingScore: 70,
          questions: [
            { question: 'What is the primary distinction between conscious and subconscious in the Theory of Mind?', options: ['Conscious is unaware; subconscious is aware', 'Conscious is analytical; subconscious stores beliefs and runs habits', 'They are the same thing', 'Subconscious is only active in sleep'], correctAnswer: 1, explanation: 'The conscious mind is analytical and rational, while the subconscious stores beliefs, emotions, memory, and habit patterns — which is why hypnotherapy works with the subconscious to create change.' },
            { question: 'What is a post-hypnotic suggestion?', options: ['A suggestion given before the session begins', 'A suggestion that influences the client after they return to waking awareness', 'A medical prescription', 'A way to wake the client'], correctAnswer: 1, explanation: 'Post-hypnotic suggestions are planted during trance and continue to influence behaviour and re-induction after the client awakens.' },
          ],
        },
      },
      {
        title: 'Level II — Advanced Hypnotic Techniques and Modalities (40 hours, Master Hypnotherapist)',
        lessons: [
          { id: 'dch-l2-1', title: 'Hypnotic Modalities — Ericksonian & Kappasinian', type: 'text', duration: '180 min', videoUrl: null, content: 'Explore different approaches to hypnosis for varied client needs. Understand the basics of Ericksonian and Kappasinian hypnosis and the Milton model of communication.' },
          { id: 'dch-l2-2', title: 'Introduction to NLP (Neuro-Linguistic Programming)', type: 'text', duration: '180 min', videoUrl: null, content: 'Learn how language patterns influence behaviour. Foundational NLP concepts as applied to therapeutic communication.' },
          { id: 'dch-l2-3', title: 'Handwriting Analysis', type: 'text', duration: '120 min', videoUrl: null, content: 'Decode personality traits and emotional states through handwriting — a hypno-diagnostic tool used alongside trance work.' },
          { id: 'dch-l2-4', title: 'Hypnotic Regression — Age & Past Life', type: 'text', duration: '240 min', videoUrl: null, content: 'Guide clients to explore and resolve past emotional blockages. Hypno-diagnostic tools for each stage of development; if frequent regression to an age, do completion.' },
          { id: 'dch-l2-5', title: 'Dream Therapy and Interpretation', type: 'text', duration: '120 min', videoUrl: null, content: 'Use dreams to uncover subconscious conflicts and insights.' },
          { id: 'dch-l2-6', title: 'Fear, Phobia & Anxiety Management', type: 'text', duration: '180 min', videoUrl: null, content: 'Empower clients to overcome deep-seated fears, anxieties, and depression. Includes corrective therapy and the Paris window technique.' },
          { id: 'dch-l2-7', title: 'Emotional Empowerment & Body Syndromes', type: 'text', duration: '180 min', videoUrl: null, content: 'Facilitate emotional breakthroughs and self-empowerment. Body syndromes: crying, responsibility, fight and flight, guilt. Includes ideomotor responses and passive-aggressive behaviour.' },
          { id: 'dch-l2-8', title: 'Medical Model of Hypnosis & Child Hypnosis', type: 'text', duration: '180 min', videoUrl: null, content: 'Hypnosis applications in pain management and physical healing. Adapt techniques for effective work with children.' },
          { id: 'dch-l2-9', title: 'Hypno-Diagnostic Tools & Hypno-Drama', type: 'text', duration: '120 min', videoUrl: null, content: 'Use specialized tools to assess emotional blockages. Guide clients through role-playing to resolve inner conflicts.' },
        ],
        quiz: {
          title: 'Level II Assessment — Master Hypnotherapist',
          passingScore: 70,
          questions: [
            { question: 'Who developed the indirect, conversational style of hypnosis?', options: ['Franz Mesmer', 'James Braid', 'Milton Erickson', 'John Kappas'], correctAnswer: 2, explanation: 'Milton Erickson pioneered indirect, conversational hypnosis — the basis of the Milton Model in NLP.' },
            { question: 'In hypnotic regression, what does "completion" refer to?', options: ['Ending the session', 'Resolving the unfinished emotional content of an age the client repeatedly regresses to', 'Awakening the client', 'Writing session notes'], correctAnswer: 1, explanation: 'When a client repeatedly regresses to a particular age, completion refers to working through and resolving the unfinished emotional content from that developmental stage.' },
          ],
        },
      },
      {
        title: 'Level III — Clinical Hypnotherapy (50 hours, Clinical Hypnotherapist)',
        lessons: [
          { id: 'dch-l3-1', title: 'Physical & Emotional Sexuality', type: 'text', duration: '180 min', videoUrl: null, content: 'Understand why and how men and women relate with each other. Address relationship dynamics, intimacy challenges, and sexual dysfunction — both emotional and physical barriers.' },
          { id: 'dch-l3-2', title: 'Relationship & Family Systems Counselling', type: 'text', duration: '240 min', videoUrl: null, content: 'Help clients navigate emotional conflicts and restore balance. Apply systemic therapy to resolve generational trauma. Includes children of dysfunctional vs healthy relationships.' },
          { id: 'dch-l3-3', title: 'Substance Abuse & Eating Disorders', type: 'text', duration: '240 min', videoUrl: null, content: 'Support clients struggling with addiction, anorexia, bulimia, and related disorders.' },
          { id: 'dch-l3-4', title: 'Habit Control — Smoking, Alcohol, Weight', type: 'text', duration: '180 min', videoUrl: null, content: 'Help clients break free from destructive habits and achieve sustainable weight management.' },
          { id: 'dch-l3-5', title: 'Allergy Management & Medical Model', type: 'text', duration: '180 min', videoUrl: null, content: 'How hypnosis aids in managing physical reactions, pains, aches, and diseases.' },
          { id: 'dch-l3-6', title: 'Hypnodrama & Building New Neuropathways', type: 'text', duration: '180 min', videoUrl: null, content: 'Use role-play and immersive technique to build new neuropathways. Includes genetic expressions and applications to sports performance.' },
          { id: 'dch-l3-7', title: 'NLP Language Patterns, Anchors & Triggers', type: 'text', duration: '180 min', videoUrl: null, content: 'Anchors and triggers for memory, fears, confidence, sports, and exams. Applied desensitization techniques.' },
          { id: 'dch-l3-8', title: 'Past Life Regression & Surrogacy', type: 'text', duration: '180 min', videoUrl: null, content: 'Advanced regression techniques and surrogacy work for healing.' },
          { id: 'dch-l3-9', title: 'Clinical Interviewing & First Consultation', type: 'text', duration: '180 min', videoUrl: null, content: 'First consultation in detail. Theories of psychology to understand behaviour, conflicts, and stresses. Defence mechanisms.' },
          { id: 'dch-l3-10', title: 'Crisis Intervention & Explosive Personalities', type: 'text', duration: '180 min', videoUrl: null, content: 'How to deal with explosive personalities, physical and sexual abuse cases, and crisis intervention.' },
          { id: 'dch-l3-11', title: 'The Mental Bank & Memory Enhancement', type: 'text', duration: '120 min', videoUrl: null, content: 'Teach clients to reprogram their subconscious for success. Mental Banking for abundance.' },
          { id: 'dch-l3-12', title: 'Promoting Your Practice', type: 'text', duration: '120 min', videoUrl: null, content: 'Learn how to build, advertise, and grow your hypnotherapy practice.' },
        ],
      },
      {
        title: 'Bonus Topics by MindSpa',
        lessons: [
          { id: 'dch-bn-1', title: 'NLP — Neurolinguistic Programming', type: 'text', duration: '60 min', videoUrl: null, content: 'Bonus deep-dive into NLP language patterns and reframing.' },
          { id: 'dch-bn-2', title: 'Void Identification and Clearance', type: 'text', duration: '60 min', videoUrl: null, content: 'Identify and clear inner voids that drive compulsive behaviour.' },
          { id: 'dch-bn-3', title: 'Cord Cutting & Aura Protection', type: 'text', duration: '60 min', videoUrl: null, content: 'Energetic cord-cutting, aura protection, and chakra healing session work.' },
          { id: 'dch-bn-4', title: 'Ho\'oponopono & Self-Talk Therapy', type: 'text', duration: '60 min', videoUrl: null, content: 'Hawaiian forgiveness practice combined with self-talk therapy for emotional healing.' },
          { id: 'dch-bn-5', title: 'Womb Healing & Psychic Surgery', type: 'text', duration: '60 min', videoUrl: null, content: 'Womb healing for ancestral and reproductive trauma. Introduction to psychic surgery technique.' },
        ],
      },
    ],
  },

  // ── Upcoming specialized training programs ──
  {
    id: 'psychology-self-talk',
    title: 'Psychology of Self Talk for Health, Happiness & Success',
    icon: '💬',
    category: 'psychology',
    instructor_id: 'manju-agrawal',
    duration: 'Coming Soon',
    lessons_count: 1,
    level: 'Beginner',
    price: 0,
    enrolled: 0,
    rating: 5.0,
    image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Coming Soon. Discover how the inner voice you carry shapes your physical health, emotional happiness, and outer success — and learn evidence-based techniques to rewire it.',
    whatYouLearn: [
      'How self-talk patterns impact health and wellbeing',
      'Identifying limiting and toxic inner narratives',
      'Practical reframing techniques for daily life',
      'Building a sustainable positive self-talk habit',
    ],
    modules: [
      {
        title: 'Course Overview',
        lessons: [
          { id: 'pst-1', title: 'About this Program', type: 'text', duration: '5 min', videoUrl: null, content: 'This specialized training program is coming soon. Register your interest by contacting MindSpa.' },
        ],
      },
    ],
  },
  {
    id: 'pranayam-emotional-healing',
    title: 'Pranayams for Emotional Healing',
    icon: '🌬️',
    category: 'wellness',
    instructor_id: 'manju-agrawal',
    duration: 'Coming Soon',
    lessons_count: 1,
    level: 'Beginner',
    price: 0,
    enrolled: 0,
    rating: 5.0,
    image: 'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Coming Soon. Use ancient breathwork (pranayama) techniques to regulate emotions, release stored trauma, and restore inner balance.',
    whatYouLearn: [
      'Foundational pranayama techniques and their emotional effects',
      'Breath-based release for anxiety, anger, and grief',
      'Daily breathwork sequences for emotional balance',
      'Integrating pranayama with therapy and meditation',
    ],
    modules: [
      {
        title: 'Course Overview',
        lessons: [
          { id: 'peh-1', title: 'About this Program', type: 'text', duration: '5 min', videoUrl: null, content: 'This specialized training program is coming soon. Register your interest by contacting MindSpa.' },
        ],
      },
    ],
  },
  {
    id: 'chakra-energy-balancing',
    title: 'Chakra & Energy Balancing',
    icon: '🪷',
    category: 'wellness',
    instructor_id: 'manju-agrawal',
    duration: 'Coming Soon',
    lessons_count: 1,
    level: 'Beginner',
    price: 0,
    enrolled: 0,
    rating: 5.0,
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Coming Soon. Understand the seven major energy centres of the body, identify imbalances, and learn practical balancing techniques.',
    whatYouLearn: [
      'Anatomy of the seven primary chakras',
      'Diagnostic methods for identifying chakra imbalances',
      'Hands-on energy balancing techniques',
      'Combining chakra work with hypnotherapy and meditation',
    ],
    modules: [
      {
        title: 'Course Overview',
        lessons: [
          { id: 'ceb-1', title: 'About this Program', type: 'text', duration: '5 min', videoUrl: null, content: 'This specialized training program is coming soon. Register your interest by contacting MindSpa.' },
        ],
      },
    ],
  },
  {
    id: 'unlimited-rocking-life',
    title: 'Unlimited Rocking Life',
    icon: '🚀',
    category: 'coaching',
    instructor_id: 'manju-agrawal',
    duration: 'Coming Soon',
    lessons_count: 1,
    level: 'Intermediate',
    price: 0,
    enrolled: 0,
    rating: 5.0,
    image: 'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Coming Soon. A signature MindSpa program designed to break through self-imposed limits and live a vibrant, abundant, fulfilling life.',
    whatYouLearn: [
      'Identifying and dissolving limiting beliefs',
      'Designing a life aligned with your core values',
      'Habits and rituals for sustained energy and momentum',
      'Tools for resilience under stress',
    ],
    modules: [
      {
        title: 'Course Overview',
        lessons: [
          { id: 'url-1', title: 'About this Program', type: 'text', duration: '5 min', videoUrl: null, content: 'This specialized training program is coming soon. Register your interest by contacting MindSpa.' },
        ],
      },
    ],
  },
  {
    id: 'self-hypnosis-program',
    title: 'Self Hypnosis',
    icon: '🧘‍♂️',
    category: 'therapy',
    instructor_id: 'manju-agrawal',
    duration: 'Coming Soon',
    lessons_count: 1,
    level: 'Beginner',
    price: 0,
    enrolled: 0,
    rating: 5.0,
    image: 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Coming Soon. Learn to safely guide yourself into trance, plant constructive suggestions, and use self-hypnosis as a daily tool for emotional balance and goal achievement.',
    whatYouLearn: [
      'Safe self-induction techniques',
      'Crafting effective self-suggestions',
      'Daily self-hypnosis routines',
      'Using self-hypnosis for habit change and stress relief',
    ],
    modules: [
      {
        title: 'Course Overview',
        lessons: [
          { id: 'shp-1', title: 'About this Program', type: 'text', duration: '5 min', videoUrl: null, content: 'This specialized training program is coming soon. Register your interest by contacting MindSpa.' },
        ],
      },
    ],
  },
  {
    id: 'law-of-attraction',
    title: 'Law of Attraction',
    icon: '✨',
    category: 'coaching',
    instructor_id: 'manju-agrawal',
    duration: 'Coming Soon',
    lessons_count: 1,
    level: 'Beginner',
    price: 0,
    enrolled: 0,
    rating: 5.0,
    image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Coming Soon. Move beyond pop-culture clichés into a structured, psychology-grounded approach to manifestation, intention setting, and aligned action.',
    whatYouLearn: [
      'The psychology and neuroscience behind manifestation',
      'Clarifying intentions and setting aligned goals',
      'Visualization and emotional alignment techniques',
      'Aligned action — turning intention into outcome',
    ],
    modules: [
      {
        title: 'Course Overview',
        lessons: [
          { id: 'loa-1', title: 'About this Program', type: 'text', duration: '5 min', videoUrl: null, content: 'This specialized training program is coming soon. Register your interest by contacting MindSpa.' },
        ],
      },
    ],
  },
];

module.exports = { courses };
