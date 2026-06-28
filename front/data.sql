-- Insérer les événements
INSERT INTO events (id, title, description, start_date, end_date, location) VALUES
('8e2c8a02-85c6-4b26-8616-fd0237470f18', 'TechConf 2025', 'La grande conférence tech annuelle réunissant les meilleurs experts du secteur.', '2025-06-10 09:00:00', '2025-06-11 18:00:00', 'Paris, Palais des Congrès'),
('92577888-99f2-41a0-a2ef-490b50b0cab6', 'DevSummit Europe', 'Summit européen dédié aux développeurs et aux nouvelles technologies.', '2025-07-15 08:30:00', '2025-07-17 17:00:00', 'Berlin, CityCube'),
('e260d12a-907b-4b57-9944-6b58d5ba469d', 'AI & Data Forum', 'Forum sur l''intelligence artificielle et la science des données.', '2025-09-05 09:00:00', '2025-09-06 18:00:00', 'Lyon, Centre de Congrès')
ON CONFLICT (id) DO NOTHING;

-- Insérer les salles pour TechConf 2025 (8e2c8a02-85c6-4b26-8616-fd0237470f18)
INSERT INTO rooms (id, event_id, name) VALUES
('217491ba-c0c5-4ab5-922d-0842dc8f9ae5', '8e2c8a02-85c6-4b26-8616-fd0237470f18', 'Amphi A - Grand Auditorium'),
('87700d2a-4ad3-4cf0-b114-2afdf74881fe', '8e2c8a02-85c6-4b26-8616-fd0237470f18', 'Salle B - Workshop'),
('6492235c-867b-4fa2-994e-b5285082279d', '8e2c8a02-85c6-4b26-8616-fd0237470f18', 'Salle C - Conférence'),
('b7f6c55b-9489-4802-af5c-5f65aed7b4d3', '8e2c8a02-85c6-4b26-8616-fd0237470f18', 'Salle D - Lab')
ON CONFLICT (id) DO NOTHING;

-- Insérer des salles pour DevSummit Europe (92577888-99f2-41a0-a2ef-490b50b0cab6)
INSERT INTO rooms (id, event_id, name) VALUES
('517491ba-c0c5-4ab5-922d-0842dc8f9ae5', '92577888-99f2-41a0-a2ef-490b50b0cab6', 'Main Auditorium (Berlin)'),
('57700d2a-4ad3-4cf0-b114-2afdf74881fe', '92577888-99f2-41a0-a2ef-490b50b0cab6', 'Workshop Room 1')
ON CONFLICT (id) DO NOTHING;

-- Insérer des salles pour AI & Data Forum (e260d12a-907b-4b57-9944-6b58d5ba469d)
INSERT INTO rooms (id, event_id, name) VALUES
('617491ba-c0c5-4ab5-922d-0842dc8f9ae5', 'e260d12a-907b-4b57-9944-6b58d5ba469d', 'Amphithéâtre Lumière'),
('67700d2a-4ad3-4cf0-b114-2afdf74881fe', 'e260d12a-907b-4b57-9944-6b58d5ba469d', 'Salle Rhône')
ON CONFLICT (id) DO NOTHING;

-- Insérer les conférenciers (speakers)
INSERT INTO speakers (id, full_name, photo_url, bio) VALUES
('296a50fe-7123-4b25-a7d1-7a961b9d7cdb', 'Alice Martin', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face', 'Ingénieure senior chez TechCorp, spécialiste React et architectures front-end modernes.'),
('fa8a2379-261e-4da0-9cc9-a77c3e5573c7', 'Thomas Dubois', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face', 'CTO de StartupAI, expert en machine learning et systèmes distribués.'),
('c61d6f4a-0da3-486e-8f2a-994805311119', 'Sophie Chen', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face', 'Développeuse full-stack et conférencière internationale, passionnée par le DevOps.'),
('f8124b23-723f-4e6c-bfe8-0393f20f3f23', 'Marc Lefebvre', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face', 'Architecte cloud chez CloudScale, spécialiste Kubernetes et infrastructure as code.'),
('ed5f2d4d-4949-411a-8ab6-443551370906', 'Emma Rodriguez', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face', 'Data Scientist chez DataLab, experte en NLP et modèles de langage.'),
('f102b2ea-d1b0-463c-b2f5-76ee3e8df904', 'Lucas Bernard', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face', 'Lead Developer chez FinTech Solutions, expert en sécurité applicative.')
ON CONFLICT (id) DO NOTHING;

-- Insérer les liens des réseaux sociaux des speakers
INSERT INTO speaker_links (speaker_id, type, url) VALUES
('296a50fe-7123-4b25-a7d1-7a961b9d7cdb', 'twitter', 'https://twitter.com/alicemartin'),
('296a50fe-7123-4b25-a7d1-7a961b9d7cdb', 'github', 'https://github.com/alicemartin'),
('296a50fe-7123-4b25-a7d1-7a961b9d7cdb', 'linkedin', 'https://linkedin.com/in/alicemartin'),
('fa8a2379-261e-4da0-9cc9-a77c3e5573c7', 'twitter', 'https://twitter.com/thomasdubois'),
('fa8a2379-261e-4da0-9cc9-a77c3e5573c7', 'linkedin', 'https://linkedin.com/in/thomasdubois'),
('c61d6f4a-0da3-486e-8f2a-994805311119', 'github', 'https://github.com/sophiechen'),
('c61d6f4a-0da3-486e-8f2a-994805311119', 'website', 'https://sophiechen.dev'),
('f8124b23-723f-4e6c-bfe8-0393f20f3f23', 'twitter', 'https://twitter.com/marclefebvre'),
('f8124b23-723f-4e6c-bfe8-0393f20f3f23', 'github', 'https://github.com/marclefebvre'),
('ed5f2d4d-4949-411a-8ab6-443551370906', 'linkedin', 'https://linkedin.com/in/emmarodriguez'),
('ed5f2d4d-4949-411a-8ab6-443551370906', 'github', 'https://github.com/emmarodriguez'),
('f102b2ea-d1b0-463c-b2f5-76ee3e8df904', 'twitter', 'https://twitter.com/lucasbernard')
ON CONFLICT DO NOTHING;

-- Insérer les sessions
INSERT INTO sessions (id, event_id, room_id, title, description, start_time, end_time, capacity) VALUES
('3cb9b771-209d-43c4-bc9a-7ba9ca599822', '8e2c8a02-85c6-4b26-8616-fd0237470f18', '217491ba-c0c5-4ab5-922d-0842dc8f9ae5', 'Keynote d''ouverture - L''avenir du web', 'Une vision de l''évolution du web dans les 5 prochaines années.', '2025-06-10 09:00:00', '2025-06-10 10:00:00', 500),
('975c1fd5-5661-48a1-856b-31b058bdbe0d', '8e2c8a02-85c6-4b26-8616-fd0237470f18', '217491ba-c0c5-4ab5-922d-0842dc8f9ae5', 'React 19 : Les nouveautés', 'Découvrez les nouvelles fonctionnalités de React 19 et comment les intégrer.', '2025-06-10 10:30:00', '2025-06-10 11:30:00', 300),
('6d6c29e7-4334-40b0-a816-a3fb0f423b58', '8e2c8a02-85c6-4b26-8616-fd0237470f18', '87700d2a-4ad3-4cf0-b114-2afdf74881fe', 'Workshop : Introduction au Machine Learning', 'Atelier pratique pour débuter avec le ML en Python.', '2025-06-10 10:30:00', '2025-06-10 12:30:00', 50),
('f3769363-de71-4842-ac21-9c547c92197f', '8e2c8a02-85c6-4b26-8616-fd0237470f18', '6492235c-867b-4fa2-994e-b5285082279d', 'DevOps : CI/CD à grande échelle', 'Comment mettre en place des pipelines CI/CD pour des équipes de 100+ développeurs.', '2025-06-10 14:00:00', '2025-06-10 15:00:00', 200),
('675b1870-bb70-4bd8-9f77-67340ca59d94', '8e2c8a02-85c6-4b26-8616-fd0237470f18', '217491ba-c0c5-4ab5-922d-0842dc8f9ae5', 'Kubernetes avancé', 'Patterns avancés pour orchestrer vos conteneurs en production.', '2025-06-10 15:30:00', '2025-06-10 16:30:00', 300),
('89b3a21b-e04a-4535-8b32-ac1f400eb106', '8e2c8a02-85c6-4b26-8616-fd0237470f18', '6492235c-867b-4fa2-994e-b5285082279d', 'Sécurité des APIs', 'Best practices pour sécuriser vos APIs REST et GraphQL.', '2025-06-11 09:00:00', '2025-06-11 10:00:00', 200),
('a7aa9e8e-779d-4986-86a5-7deb1dc87341', '8e2c8a02-85c6-4b26-8616-fd0237470f18', '217491ba-c0c5-4ab5-922d-0842dc8f9ae5', 'NLP et LLMs en production', 'Déployer des modèles de langage à grande échelle.', '2025-06-11 10:30:00', '2025-06-11 11:30:00', 400),
('7bc4adfb-aa9d-4cb4-a515-3c7bac290f96', '92577888-99f2-41a0-a2ef-490b50b0cab6', '517491ba-c0c5-4ab5-922d-0842dc8f9ae5', 'Opening Keynote - Future of Development', 'Exploring the next frontier in software development.', '2025-07-15 09:00:00', '2025-07-15 10:00:00', 600)
ON CONFLICT (id) DO NOTHING;

-- Insérer les associations sessions-speakers
INSERT INTO session_speakers (session_id, speaker_id) VALUES
('3cb9b771-209d-43c4-bc9a-7ba9ca599822', '296a50fe-7123-4b25-a7d1-7a961b9d7cdb'),
('3cb9b771-209d-43c4-bc9a-7ba9ca599822', 'fa8a2379-261e-4da0-9cc9-a77c3e5573c7'),
('975c1fd5-5661-48a1-856b-31b058bdbe0d', 'fa8a2379-261e-4da0-9cc9-a77c3e5573c7'),
('975c1fd5-5661-48a1-856b-31b058bdbe0d', 'c61d6f4a-0da3-486e-8f2a-994805311119'),
('6d6c29e7-4334-40b0-a816-a3fb0f423b58', '296a50fe-7123-4b25-a7d1-7a961b9d7cdb'),
('6d6c29e7-4334-40b0-a816-a3fb0f423b58', 'f8124b23-723f-4e6c-bfe8-0393f20f3f23'),
('f3769363-de71-4842-ac21-9c547c92197f', 'fa8a2379-261e-4da0-9cc9-a77c3e5573c7'),
('f3769363-de71-4842-ac21-9c547c92197f', 'ed5f2d4d-4949-411a-8ab6-443551370906'),
('675b1870-bb70-4bd8-9f77-67340ca59d94', 'c61d6f4a-0da3-486e-8f2a-994805311119'),
('675b1870-bb70-4bd8-9f77-67340ca59d94', 'f102b2ea-d1b0-463c-b2f5-76ee3e8df904'),
('89b3a21b-e04a-4535-8b32-ac1f400eb106', 'f8124b23-723f-4e6c-bfe8-0393f20f3f23'),
('89b3a21b-e04a-4535-8b32-ac1f400eb106', 'ed5f2d4d-4949-411a-8ab6-443551370906'),
('7bc4adfb-aa9d-4cb4-a515-3c7bac290f96', 'c61d6f4a-0da3-486e-8f2a-994805311119'),
('7bc4adfb-aa9d-4cb4-a515-3c7bac290f96', 'f8124b23-723f-4e6c-bfe8-0393f20f3f23')
ON CONFLICT (session_id, speaker_id) DO NOTHING;

-- Insérer les questions
INSERT INTO questions (session_id, content, author_name, upvotes, created_at) VALUES
('975c1fd5-5661-48a1-856b-31b058bdbe0d', 'Quelles sont les breaking changes majeures de React 19 ?', 'Marie D.', 42, '2025-06-10 10:35:00'),
('975c1fd5-5661-48a1-856b-31b058bdbe0d', 'Comment migrer progressivement de React 18 vers 19 ?', 'Pierre L.', 28, '2025-06-10 10:40:00'),
('975c1fd5-5661-48a1-856b-31b058bdbe0d', 'Les Server Components sont-ils prêts pour la production ?', NULL, 35, '2025-06-10 10:45:00'),
('6d6c29e7-4334-40b0-a816-a3fb0f423b58', 'Quel framework ML recommandez-vous pour débuter ?', 'Sophie M.', 15, '2025-06-10 11:00:00'),
('6d6c29e7-4334-40b0-a816-a3fb0f423b58', 'Comment évaluer la performance d''un modèle de classification ?', NULL, 8, '2025-06-10 11:08:00'),
('3cb9b771-209d-43c4-bc9a-7ba9ca599822', 'Quelle est la vision long terme de la plateforme EventSync ?', 'Admin', 42, '2025-06-10 09:15:00'),
('3cb9b771-209d-43c4-bc9a-7ba9ca599822', 'Prévoyez-vous une application mobile native ?', 'Sophie L.', 12, '2025-06-10 09:20:00'),
('6d6c29e7-4334-40b0-a816-a3fb0f423b58', 'Comment optimiser les performances LCP sur Next.js 15 ?', 'Marc A.', 15, '2025-06-10 11:45:00')
ON CONFLICT (id) DO NOTHING;
