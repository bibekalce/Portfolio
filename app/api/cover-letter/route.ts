import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MANISH_BIO = `Name: Manish Adhikari
Location: Adelaide, South Australia
Email: madhikari824@gmail.com

Education:
- Master of Artificial Intelligence and Machine Learning, University of Adelaide (Apr 2022 – Apr 2024)
- Professional Year Program (ICT), Academy IT, Adelaide — Completed April 2026 (ACS-accredited, 12-week industry internship)
- Bachelor of Electronics and Communication Engineering, Tribhuvan University, Nepal (2014–2018)

Experience:
- ICT Intern, Jaba Pty Ltd, Adelaide (Jan–Apr 2026): designed multi-tenant SSR system, Firebase/CMS integration, Azure disk migration (unmanaged to managed), Azure log storage issue resolution + Bash automation, AI agent and LLM model evaluation/comparison, prompt testing, client presentations on AI features and system designs
- IT Support, Ultra Tech Solar, Nepal (Nov 2017–Apr 2018): network troubleshooting, 32-channel DVR CCTV installation, office IT setup during relocations

Key skills: Python (advanced), TensorFlow, Scikit-learn, NLP (BERT, BART, Word2Vec), Computer Vision (OpenCV, CNNs), Transfer Learning, Microsoft Azure, Firebase, FastAPI, REST APIs, PWA, IoT (Arduino, Raspberry Pi), SQL, Bash, Git, Agile/Scrum, LLM evaluation, Prompt Engineering

Notable projects:
- Recommender system using NLP + CNN (TensorFlow) — explainable recommendations from user reviews
- Closed-domain QA system on 10,000 CORD-19 papers using BERT SQuAD 2.0 + BART
- Animal classification: 98.28% Top-5 accuracy using MobileNetV2 + EfficientNet-B4 (6,270 images, 151 categories)
- Smart Rooftop Farming System: Arduino/Raspberry Pi IoT greenhouse with SQL logging and web interface
- Python invoicing app: Gmail API automation, Fernet encryption, multi-account ABN support
- Personal website (deployed independently)
- PWA web application (production-ready, independently built)

ACS Student Member`;

export async function POST(request: Request) {
  try {
    const { jobTitle, company, jobDescription } = await request.json();

    if (!jobTitle || !company) {
      return Response.json(
        { error: "Job title and company are required" },
        { status: 400 }
      );
    }

    const prompt = `Write a professional cover letter for Manish Adhikari applying for the role of ${jobTitle} at ${company} in Adelaide, Australia.${
      jobDescription ? `\n\nJob description:\n${jobDescription}` : ""
    }

Background information about Manish:
${MANISH_BIO}

Instructions:
- 3–4 paragraphs, professional and confident
- Tailored specifically to the role and company
- Highlight the most relevant skills and experience for this position
- Australian professional style — direct, evidence-based, no fluff
- End with a clear call to action
- Do NOT include placeholders or instructions — write a complete, ready-to-use letter
- Address to "Dear Hiring Manager" unless the company name suggests otherwise`;

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const content =
      response.content[0].type === "text" ? response.content[0].text : "";

    return Response.json({ content });
  } catch {
    return Response.json({ error: "Failed to generate cover letter" }, { status: 500 });
  }
}
