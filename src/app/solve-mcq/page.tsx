import Mcqs from '@/components/mcq/Mcqs';
import Axios from '@/lib/Axios';
import React from 'react'

const page = async ({ searchParams }) => {
    const { query } = await searchParams;

    // const apiParams = {
    //     course: query.course || undefined,
    //     subject: query.subject || undefined,
    //     chapter: query.chapter || undefined,
    //     topic: query.topic || undefined,
    //     catagory: query.catagory || undefined,
    // };

    const dummyMcqData = [
        {
            _id: "mcq_001",
            question: "What is the chemical formula for water?",
            options: [
                "H2O",
                "CO2",
                "NaCl",
                "CH4"
            ],
            correctOption: 1,
            selected: null,
            lock: false,
            difficulty: "easy",
            subject: "chemistry",
            info: "Basic Chemistry",
            explain: "Water is composed of two hydrogen atoms and one oxygen atom, hence the chemical formula H2O. This is one of the most fundamental compounds in chemistry and essential for all life on Earth.",
            imageUrl: null
        },
        {
            _id: "mcq_002",
            question: "Which planet is known as the 'Red Planet'?",
            options: [
                "Venus",
                "Mars",
                "Jupiter",
                "Saturn"
            ],
            correctOption: 2,
            selected: null,
            lock: false,
            difficulty: "easy",
            subject: "physics",
            info: "Astronomy",
            explain: "Mars is called the 'Red Planet' because of its reddish appearance, which is due to iron oxide (rust) on its surface. This distinctive color makes it easily recognizable in the night sky.",
            imageUrl: "/placeholder.svg?height=200&width=300"
        },
        {
            _id: "mcq_003",
            question: "What is the derivative of $x^2 + 3x + 5$ with respect to x?",
            options: [
                "$2x + 3$",
                "$x^2 + 3$",
                "$2x + 5$",
                "$x + 3$"
            ],
            correctOption: 1,
            selected: null,
            lock: false,
            difficulty: "medium",
            subject: "mathematics",
            info: "Calculus",
            explain: "Using the power rule of differentiation: $\\frac{d}{dx}(x^n) = nx^{n-1}$\n\nFor $x^2 + 3x + 5$:\n- $\\frac{d}{dx}(x^2) = 2x$\n- $\\frac{d}{dx}(3x) = 3$\n- $\\frac{d}{dx}(5) = 0$\n\nTherefore, the derivative is $2x + 3$.",
            imageUrl: null
        },
        {
            _id: "mcq_004",
            question: "Which of the following is NOT a programming paradigm?",
            options: [
                "Object-Oriented Programming",
                "Functional Programming",
                "Procedural Programming",
                "Database Programming"
            ],
            correctOption: 4,
            selected: null,
            lock: false,
            difficulty: "medium",
            subject: "computer science",
            info: "Programming Concepts",
            explain: "Database Programming is not a programming paradigm but rather a domain or application area. The main programming paradigms include Object-Oriented, Functional, Procedural, Logic, and Declarative programming.",
            imageUrl: null
        },
        {
            _id: "mcq_005",
            question: "What is the powerhouse of the cell?",
            options: [
                "Nucleus",
                "Ribosome",
                "Mitochondria",
                "Endoplasmic Reticulum"
            ],
            correctOption: 3,
            selected: null,
            lock: false,
            difficulty: "easy",
            subject: "biology",
            info: "Cell Biology",
            explain: "Mitochondria are called the 'powerhouse of the cell' because they produce ATP (adenosine triphosphate), which is the primary energy currency of cells. They convert glucose and oxygen into usable energy through cellular respiration.",
            imageUrl: "/placeholder.svg?height=250&width=400"
        },
        {
            _id: "mcq_006",
            question: "Which law states that 'For every action, there is an equal and opposite reaction'?",
            options: [
                "Newton's First Law",
                "Newton's Second Law",
                "Newton's Third Law",
                "Law of Conservation of Energy"
            ],
            correctOption: 3,
            selected: null,
            lock: false,
            difficulty: "easy",
            subject: "physics",
            info: "Classical Mechanics",
            explain: "Newton's Third Law of Motion states that for every action, there is an equal and opposite reaction. This means that forces always occur in pairs - when object A exerts a force on object B, object B simultaneously exerts an equal force in the opposite direction on object A.",
            imageUrl: null
        },
        {
            _id: "mcq_007",
            question: "What is the solution to the equation $2x + 5 = 13$?",
            options: [
                "$x = 4$",
                "$x = 6$",
                "$x = 8$",
                "$x = 9$"
            ],
            correctOption: 1,
            selected: null,
            lock: false,
            difficulty: "easy",
            subject: "mathematics",
            info: "Algebra",
            explain: "To solve $2x + 5 = 13$:\n\nStep 1: Subtract 5 from both sides\n$2x + 5 - 5 = 13 - 5$\n$2x = 8$\n\nStep 2: Divide both sides by 2\n$\\frac{2x}{2} = \\frac{8}{2}$\n$x = 4$",
            imageUrl: null
        },
        {
            _id: "mcq_008",
            question: "Which gas makes up approximately 78% of Earth's atmosphere?",
            options: [
                "Oxygen",
                "Carbon Dioxide",
                "Nitrogen",
                "Argon"
            ],
            correctOption: 3,
            selected: null,
            lock: false,
            difficulty: "medium",
            subject: "chemistry",
            info: "Atmospheric Chemistry",
            explain: "Earth's atmosphere is composed of approximately 78% nitrogen (N₂), 21% oxygen (O₂), 0.93% argon, and 0.04% carbon dioxide, along with trace amounts of other gases. Nitrogen is essential for protein synthesis in living organisms.",
            imageUrl: null
        },
        {
            _id: "mcq_009",
            question: "What is the process by which plants make their own food?",
            options: [
                "Respiration",
                "Photosynthesis",
                "Transpiration",
                "Germination"
            ],
            correctOption: 2,
            selected: null,
            lock: false,
            difficulty: "easy",
            subject: "biology",
            info: "Plant Biology",
            explain: "Photosynthesis is the process by which plants convert light energy (usually from the sun) into chemical energy stored in glucose. The general equation is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. This process occurs primarily in the chloroplasts of plant cells.",
            imageUrl: "/placeholder.svg?height=300&width=450"
        },
        {
            _id: "mcq_010",
            question: "Which data structure follows the Last-In-First-Out (LIFO) principle?",
            options: [
                "Queue",
                "Stack",
                "Array",
                "Linked List"
            ],
            correctOption: 2,
            selected: null,
            lock: false,
            difficulty: "medium",
            subject: "computer science",
            info: "Data Structures",
            explain: "A Stack follows the Last-In-First-Out (LIFO) principle, meaning the last element added to the stack is the first one to be removed. Common operations include push (add element) and pop (remove top element). Think of it like a stack of plates - you add and remove from the top.",
            imageUrl: null
        },
        {
            _id: "mcq_011",
            question: "What is the integral of $\\int 2x \\, dx$?",
            options: [
                "$x^2 + C$",
                "$2x^2 + C$",
                "$x^2/2 + C$",
                "$2x + C$"
            ],
            correctOption: 1,
            selected: null,
            lock: false,
            difficulty: "medium",
            subject: "mathematics",
            info: "Calculus",
            explain: "Using the power rule for integration: $\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C$\n\nFor $\\int 2x \\, dx$:\n$= 2 \\int x \\, dx$\n$= 2 \\cdot \\frac{x^2}{2} + C$\n$= x^2 + C$\n\nWhere C is the constant of integration.",
            imageUrl: null
        },
        {
            _id: "mcq_012",
            question: "Which element has the atomic number 6?",
            options: [
                "Oxygen",
                "Carbon",
                "Nitrogen",
                "Boron"
            ],
            correctOption: 2,
            selected: null,
            lock: false,
            difficulty: "easy",
            subject: "chemistry",
            info: "Periodic Table",
            explain: "Carbon has the atomic number 6, meaning it has 6 protons in its nucleus. Carbon is essential for all known life forms and is the basis of organic chemistry. It can form four covalent bonds, making it incredibly versatile in forming complex molecules.",
            imageUrl: null
        },
        {
            _id: "mcq_013",
            question: "What is the speed of light in vacuum?",
            options: [
                "$3 \\times 10^8$ m/s",
                "$3 \\times 10^6$ m/s",
                "$3 \\times 10^{10}$ m/s",
                "$3 \\times 10^7$ m/s"
            ],
            correctOption: 1,
            selected: null,
            lock: false,
            difficulty: "medium",
            subject: "physics",
            info: "Modern Physics",
            explain: "The speed of light in vacuum is approximately $3 \\times 10^8$ meters per second (299,792,458 m/s to be exact). This is a fundamental constant in physics, denoted by 'c', and is the maximum speed at which all matter and information can travel.",
            imageUrl: null
        },
        {
            _id: "mcq_014",
            question: "Which organelle is responsible for protein synthesis?",
            options: [
                "Mitochondria",
                "Golgi Apparatus",
                "Ribosomes",
                "Lysosomes"
            ],
            correctOption: 3,
            selected: null,
            lock: false,
            difficulty: "medium",
            subject: "biology",
            info: "Cell Biology",
            explain: "Ribosomes are the cellular organelles responsible for protein synthesis. They read the genetic information from mRNA (messenger RNA) and translate it into proteins by linking amino acids together in the correct sequence. Ribosomes can be found free in the cytoplasm or attached to the endoplasmic reticulum.",
            imageUrl: "/placeholder.svg?height=280&width=420"
        },
        {
            _id: "mcq_015",
            question: "What is the time complexity of binary search?",
            options: [
                "O(n)",
                "O(log n)",
                "O(n²)",
                "O(1)"
            ],
            correctOption: 2,
            selected: null,
            lock: false,
            difficulty: "hard",
            subject: "computer science",
            info: "Algorithms",
            explain: "Binary search has a time complexity of O(log n) because it eliminates half of the remaining elements in each step. For an array of n elements, it takes at most log₂(n) comparisons to find the target element or determine it's not present. This makes it much more efficient than linear search O(n) for sorted arrays.",
            imageUrl: null
        }
    ]

    const fetchData = async () => {
        try {
            // const response = await Axios.post('/mcq/get', { course, subject, chapter, topic, catagory, userId: user._id });
        } catch (error) {
        }
    }
    fetchData();

    return (
        <div>
            <Mcqs subject={"english"} chapter={"chapter-1"} mcqData={dummyMcqData} />
        </div>
    )
}

export default page