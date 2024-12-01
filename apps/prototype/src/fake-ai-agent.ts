import markdownit from "markdown-it";

import type { AIAgent } from "@repo/extension";

const summary = `Cognitive load refers to the amount of working memory resources required to process information and complete tasks. Understanding cognitive load is crucial in fields like instructional design, as it influences how effectively individuals learn and perform tasks.

**Types of Cognitive Load:**

1.	Intrinsic Load: The inherent complexity associated with a specific task or topic. This load is determined by the nature of the material itself.
2.	Extraneous Load: The additional cognitive burden imposed by the way information is presented. Poor instructional design can increase extraneous load, making learning more difficult.
3.	Germane Load: The mental effort dedicated to processing information and constructing schemas, which are mental structures that help in understanding and storing knowledge.

**Historical Background:**

In the 1950s, psychologist George A. Miller suggested that working memory has a limited capacity, typically holding about seven (plus or minus two) units of information. This concept was further developed in the late 1980s by John Sweller, who introduced Cognitive Load Theory (CLT). Sweller’s research indicated that problem-solving often overwhelms working memory, hindering learning. He advocated for instructional designs that minimize unnecessary cognitive load to enhance learning efficiency.

**Implications for Instructional Design:**

Effective instructional design aims to manage cognitive load by:
- Reducing Extraneous Load: Simplifying the presentation of information to avoid unnecessary complexity.
- Managing Intrinsic Load: Breaking down complex information into smaller, more manageable parts.
- Enhancing Germane Load: Encouraging activities that promote deep processing and schema construction.

By considering these factors, educators and designers can create materials that align with the cognitive capacities of learners, thereby improving comprehension and retention.

For more detailed information, you can refer to the Wikipedia page on Cognitive Load.`;

const recommended = `Here are additional resources to explore topics similar to cognitive load theory:

1.	[Cognitive Load Theory and Instructional Design](https://www.researchgate.net/publication/228676629_Cognitive_Load_Theory_and_Instructional_Design). This article discusses how cognitive load theory can optimize working memory for better learning outcomes.
2.	[Cognitive Load Theory (John Sweller)](https://www.instructionaldesign.org/theories/cognitive-load/). A detailed overview of John Sweller’s theory, its principles, and its practical applications in instructional design.
3.	[Cognitive Load Theory: A Practical Guide For Teachers](https://thirdspacelearning.com/blog/cognitive-load-theory). A guide providing actionable insights into applying cognitive load theory in classrooms, focusing on managing different types of loads.
4.	[An Introduction to Cognitive Load Theory](https://theeducationhub.org.nz/wp-content/uploads/2021/03/An-introduction-to-cognitive-load-theory-v2.pdf). A comprehensive introduction to the theory and its implications for teaching and learning.
5.	[Methods to Manage Working Memory Load in Complex Tasks](https://journals.sagepub.com/doi/pdf/10.1177/0963721420922183?utm_source). This article explores evidence-based strategies to manage cognitive load in complex learning environments.

These resources provide in-depth knowledge and practical applications of cognitive load theory in education and instructional design.
`;

const md = markdownit();

export class FakeAIAgent implements AIAgent {
  public constructor(readonly instructions: string) {}

  public async prompt(input: string) {
    if (input.startsWith("Summarize")) {
      return md.render(summary);
    } else if (input.startsWith("Recommend")) {
      return md.render(recommended);
    }

    return "I'm sorry, I'm just a prototype. I don't know how to respond to that.";
  }
}
