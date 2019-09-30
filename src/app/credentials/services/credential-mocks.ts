const credentialSchemas = [
  {
    id: 'university-degree',
    ownedBy: 'Faber University',
    name: 'University Degree',
    version: '1.2',
    fields: {
      name: 'string',
      program: 'program'
    }
  },
  {
    id: 'course',
    ownedBy: 'Faber University',
    name: 'Single Course',
    version: '1.2',
    fields: {
      name: 'string',
      program: 'program'
    }
  }
];

const credentialDefs = [
  {
    id: 'fbu-bsc-cs',
    issuedBy: 'Faber University',
    issuerDid: 'xyzdf-213ras-eqadzx-123sd',
    name: 'Bachelor\'s of Science Degree',
    program: 'Computer Science',
    version: '1.2',
    schema: 'university-degree'
  },
  {
    id: 'fbu-bsc-mb',
    issuedBy: 'Faber University',
    issuerDid: 'xyzdf-213ras-eqadzx-123sd',
    name: 'Bachelor\'s of Science Degree',
    program: 'Microbiology',
    version: '1.2',
    schema: 'university-degree'
  },
  {
    id: 'fbu-mba-biz',
    issuedBy: 'Faber University',
    issuerDid: 'xyzdf-213ras-eqadzx-123sd',
    name: 'Master\'s of Business Administration',
    program: 'Business',
    version: '1.2',
    schema: 'university-degree'
  },
  {
    id: 'fbu-cert-ac',
    issuedBy: 'Faber University',
    issuerDid: 'xyzdf-213ras-eqadzx-123sd',
    name: 'Certificate of Course Completion',
    program: 'Agile Coaching',
    version: '1.2',
    schema: 'course'
  },
  {
    id: 'goog-web-dev',
    issuedBy: 'Google Inc',
    issuerDid: 'xyzdf-678ras-eqadzx-784yx',
    name: 'Google Certified Developer',
    program: 'Web Developer',
    version: '1.2',
    schema: 'certificate'
  },
  {
    id: 'goog-cld-dev',
    issuedBy: 'Google Inc',
    issuerDid: 'xyzdf-678ras-eqadzx-784yx',
    name: 'Google Certified Developer',
    program: 'Cloud Developer',
    version: '1.2',
    schema: 'certificate'
  }
];

const issuedCredentials = [
  {
    id: 'xyz-123',
    issuedBy: 'Faber University',
    issuerDid: 'xyzdf-213ras-eqadzx-123sd',
    issuedTo: 'Alice Cooper',
    dateIssued: new Date(),
    name: 'Bachelor\'s of Science Degree',
    type: 'University Degree',
    program: 'Computer Science',
    status: 'Graduated',
    version: '1.2',
    schema: 'university-degree'
  },
  {
    id: 'xyz-124',
    issuedBy: 'Faber University',
    issuerDid: 'xyzdf-213ras-eqadzx-123sd',
    issuedTo: 'Alice Cooper',
    dateIssued: new Date(),
    name: 'Bachelor\'s of Science Degree',
    type: 'University Degree',
    program: 'Microbiology',
    status: 'Graduated',
    version: '1.2',
    schema: 'university-degree'
  },
  {
    id: 'xyz-127',
    issuedBy: 'Faber University',
    issuerDid: 'xyzdf-213ras-eqadzx-123sd',
    issuedTo: 'Alice Cooper',
    dateIssued: new Date(),
    name: 'Master\'s of Business Administration',
    type: 'University Degree',
    program: 'Business',
    status: 'Graduated',
    version: '1.2',
    schema: 'university-degree'
  },
  {
    id: 'xyz-132',
    issuedBy: 'Faber University',
    issuerDid: 'xyzdf-213ras-eqadzx-123sd',
    issuedTo: 'Alice Cooper',
    dateIssued: new Date(),
    name: 'Certificate of Course Completion',
    type: 'University Degree',
    program: 'Agile Coaching',
    status: 'Graduated',
    version: '1.2',
    schema: 'random-course'
  },
  {
    id: 'goog-127',
    issuedBy: 'Google Inc.',
    issuerDid: 'xyzdf-678ras-eqadzx-784yx',
    issuedTo: 'Alice Cooper',
    dateIssued: new Date(),
    name: 'Google Certified Developer',
    type: 'Course',
    program: 'Web Developer',
    status: 'Graduated',
    version: '1.2',
    schema: 'certificate'
  },
  {
    id: 'goog-127',
    issuedBy: 'Google Inc.',
    issuerDid: 'xyzdf-678ras-eqadzx-784yx',
    issuedTo: 'Alice Cooper',
    dateIssued: new Date(),
    name: 'Google Certified Developer',
    type: 'Course',
    program: 'Cloud Developer',
    status: 'Graduated',
    version: '1.2',
    schema: 'certificate'
  },
];

const certificatesOfProof = [
  {
    id: 'abc-123',
    issuerDid: 'xyzdf-678ras-eqadzx-123qr',
    name: 'Has an Undergraduate Degree',
    version: '1.2',
    requested_attributes: {
      attr1_referents: {
        name: 'ipsum',
        restrictions: [{}]
      }
    },
    requested_predicates: [],
    status: 'pending'
  },
  {
    id: 'abc-124',
    issuerDid: 'xyzdf-678ras-eqadzx-123qr',
    name: 'Has Certificate in IT',
    version: '1.2',
    requested_attributes: {
      attr1_referents: {
        name: 'ipsum',
        restrictions: [{}]
      }
    },
    requested_predicates: [],
    status: 'pending'
  },
  {
    id: 'abc-125',
    issuerDid: 'xyzdf-678ras-eqadzx-123qr',
    name: 'Is Certified in Scrum',
    version: '1.2',
    requested_attributes: {
      attr1_referents: {
        name: 'ipsum',
        restrictions: [{}]
      }
    },
    requested_predicates: [],
    status: 'pending'
  },
  {
    id: 'abc-125',
    issuerDid: 'xyzdf-678ras-adsf324-fg456',
    name: 'Is Google Certified',
    version: '1.2',
    requested_attributes: {
      attr1_referents: {
        name: 'ipsum',
        restrictions: [{}]
      }
    },
    requested_predicates: [],
    status: 'complete'
  },
  {
    id: 'abc-126',
    issuerDid: 'xyzdf-678ras-adsf324-fg456',
    name: 'Passes a Criminal Record Check',
    version: '1.2',
    requested_attributes: {
      attr1_referents: {
        name: 'ipsum',
        restrictions: [{}]
      }
    },
    requested_predicates: [],
    status: 'complete'
  }
];

export { credentialSchemas, credentialDefs, issuedCredentials, certificatesOfProof };
