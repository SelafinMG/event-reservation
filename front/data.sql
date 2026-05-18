-- =========================
-- Données de test EventSync
-- =========================

-- Événements
INSERT INTO events (id, title, description, start_date, end_date, location)
VALUES
  ('evt-001', 'TechConf 2025', 'La grande conférence tech annuelle réunissant les meilleurs experts du secteur.', '2025-06-10 09:00:00', '2025-06-11 18:00:00', 'Paris, Palais des Congrès'),
  ('evt-002', 'DevSummit Europe', 'Summit européen dédié aux développeurs et aux nouvelles technologies.', '2025-07-15 08:30:00', '2025-07-17 17:00:00', 'Berlin, CityCube'),
  ('evt-003', 'AI & Data Forum', 'Forum sur l''intelligence artificielle et la science des données.', '2025-09-05 09:00:00', '2025-09-06 18:00:00', 'Lyon, Centre de Congrès');

-- Salles
INSERT INTO rooms (id, event_id, name)
VALUES
  ('room-a', 'evt-001', 'Amphi A - Grand Auditorium'),
  ('room-b', 'evt-001', 'Salle B - Workshop'),
  ('room-c', 'evt-001', 'Salle C - Conférence'),
  ('room-d', 'evt-001', 'Salle D - Lab');

-- Speakers
INSERT INTO speakers (id, full_name, photo_url, bio)
VALUES
  ('spk-001', 'Alice Martin', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face', 'Ingénieure senior chez TechCorp, spécialiste React et architectures front-end modernes.'),
  ('spk-002', 'Thomas Dubois', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', 'CTO de StartupAI, expert en machine learning et systèmes distribués.'),
  ('spk-003', 'Sophie Chen', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face', 'Développeuse full-stack et conférencière internationale, passionnée par le DevOps.'),
  ('spk-004', 'Marc Lefebvre', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face', 'Architecte cloud chez CloudScale, spécialiste Kubernetes et infrastructure as code.'),
  ('spk-005', 'Emma Rodriguez', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face', 'Data Scientist chez DataLab, experte en NLP et modèles de langage.'),
  ('spk-006', 'Lucas Bernard', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face', 'Lead Developer chez FinTech Solutions, expert en sécurité applicative.');

-- Liens des speakers
INSERT INTO speaker_links (speaker_id, type, url)
VALUES
  ('spk-001', 'twitter', 'https://twitter.com/alicemartin'),
  ('spk-001', 'github', 'https://github.com/alicemartin'),
  ('spk-001', 'linkedin', 'https://linkedin.com/in/alicemartin'),
  ('spk-002', 'twitter', 'https://twitter.com/thomasdubois'),
  ('spk-002', 'linkedin', 'https://linkedin.com/in/thomasdubois'),
  ('spk-003', 'github', 'https://github.com/sophiechen'),
  ('spk-003', 'website', 'https://sophiechen.dev'),
  ('spk-004', 'twitter', 'https://twitter.com/marclefebvre'),
  ('spk-004', 'github', 'https://github.com/marclefebvre'),
  ('spk-005', 'linkedin', 'https://linkedin.com/in/emmarodriguez'),
  ('spk-005', 'github', 'https://github.com/emmarodriguez'),
  ('spk-006', 'twitter', 'https://twitter.com/lucasbernard');

-- Sessions
INSERT INTO sessions (id, event_id, room_id, title, description, start_time, end_time, capacity)
VALUES
  ('sess-001', 'evt-001', 'room-a', 'Keynote d''ouverture - L''avenir du web', 'Une vision de l''évolution du web dans les 5 prochaines années.', '2025-06-10 09:00:00', '2025-06-10 10:00:00', 500),
  ('sess-002', 'evt-001', 'room-a', 'React 19 : Les nouveautés', 'Découvrez les nouvelles fonctionnalités de React 19 et comment les intégrer.', '2025-06-10 10:30:00', '2025-06-10 11:30:00', 300),
  ('sess-003', 'evt-001', 'room-b', 'Workshop : Introduction au Machine Learning', 'Atelier pratique pour débuter avec le ML en Python.', '2025-06-10 10:30:00', '2025-06-10 12:30:00', 50),
  ('sess-004', 'evt-001', 'room-c', 'DevOps : CI/CD à grande échelle', 'Comment mettre en place des pipelines CI/CD pour des équipes de 100+ développeurs.', '2025-06-10 14:00:00', '2025-06-10 15:00:00', 200),
  ('sess-005', 'evt-001', 'room-a', 'Kubernetes avancé', 'Patterns avancés pour orchestrer vos conteneurs en production.', '2025-06-10 15:30:00', '2025-06-10 16:30:00', 300),
  ('sess-006', 'evt-001', 'room-c', 'Sécurité des APIs', 'Best practices pour sécuriser vos APIs REST et GraphQL.', '2025-06-11 09:00:00', '2025-06-11 10:00:00', 200),
  ('sess-007', 'evt-001', 'room-a', 'NLP et LLMs en production', 'Déployer des modèles de langage à grande échelle.', '2025-06-11 10:30:00', '2025-06-11 11:30:00', 400),
  ('sess-008', 'evt-002', 'room-a', 'Opening Keynote - Future of Development', 'Exploring the next frontier in software development.', '2025-07-15 09:00:00', '2025-07-15 10:00:00', 600);

-- Relation sessions-speakers
INSERT INTO session_speakers (session_id, speaker_id)
VALUES
  ('sess-001', 'spk-001'),
  ('sess-001', 'spk-002'),
  ('sess-002', 'spk-001'),
  ('sess-003', 'spk-002'),
  ('sess-003', 'spk-005'),
  ('sess-004', 'spk-003'),
  ('sess-005', 'spk-004'),
  ('sess-006', 'spk-006'),
  ('sess-007', 'spk-005'),
  ('sess-007', 'spk-002'),
  ('sess-008', 'spk-003'),
  ('sess-008', 'spk-004');
