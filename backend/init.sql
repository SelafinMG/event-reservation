CREATE TABLE admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    location TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    name TEXT NOT NULL
);

CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    
    title TEXT NOT NULL,
    description TEXT,
    
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    
    capacity INTEGER,
    
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE speakers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    photo_url TEXT,
    bio TEXT
);

CREATE TABLE speaker_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    speaker_id UUID NOT NULL REFERENCES speakers(id) ON DELETE CASCADE,
    
    type TEXT CHECK (type IN ('twitter','linkedin','github','website','other')),
    url TEXT NOT NULL
);

CREATE TABLE session_speakers (
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    speaker_id UUID REFERENCES speakers(id) ON DELETE CASCADE,
    
    PRIMARY KEY (session_id, speaker_id)
);

CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
    
    content TEXT NOT NULL,
    author_name TEXT, -- nullable (anonyme)
    
    upvotes INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT NOW()
);