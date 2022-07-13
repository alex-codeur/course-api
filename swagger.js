const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        version: "1.0.0",
        title: "CoursesPlatform (Video and news App) API",
        description: "API for the tutorial on building mobile app by <b>Alex Georgy Esaki</b> using NodeJS."
    },
    host: "localhost:5000",
    basePath: "/",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
        {
            "name": "Auth",
            "description": "Auth endpoints"
        },
        {
            "name": "Admin",
            "description": "Admin endpoints"
        },
        {
            "name": "Posts",
            "description": "posts endpoints"
        },
        {
            "name": "Profile",
            "description": "User profile endpoints"
        },
    ],
    securityDefinitions: {
        Authorization: {
            type: "apiKey",
            name: "Authorization",
            description: "Value: Bearer ",
            in: "header",
            scheme: 'bearer'
        }
    },
    definition: {
        LoginModel: {
            $email: "apachecordovax@gmail.com",
            $password: "passe123",
        },
        RegisterModel: {
            $name: "Alex Esaki",
            $email: "apachecordovax@gmail.com",
            $password: "passe123",
        },
        UpdateUserModel: {
            $name: "Alex Esaki",
        },
        CategoryModel: {
            $title: "Comedy",
        },
        CourseModel: {
            $category: "6064e654b5c7475bac63ad22",
            $title: "Elon Musk Admits He Wants to travel to Mars Because No One Hates Him There Yet",
            $body: "AUSTIN, Texas - Wiping tears from his eyes at a recent press conference, SpaceX CEO Elon Musk revealed that the reason he's so keen on traveling to Mars is not for the potential benefits to science, but because it's the one place he can think of where no one hates him yet.",
        },
        VideoModel: {
            $videoId: "QWhJqvuB1ZA",
            $title: "Welcome To America with Gad Elmaleh and Ron Livingston",
        },
        CommentModel: {
            $course: "606576d16bb28e33ecf2872c",
            $body: "That's very funny (:",
        },
        VerifyEmailModel: {
            $code: 333333,
        },
        ChangePasswordModel: {
            $oldPassword: "passe123",
            $newPassword: "passe123",
        },
        ForgotPasswordModel: {
            $email: "coresoft237@gmail.com",
        },
        ResetPasswordModel: {
            $email: "coresoft237@gmail.com",
            $code: 999999,
            $newPassword: "passe123",
        },
    }
};

const outputFile = "./swagger_output.json";
const endpointFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointFiles, doc).then(() => {
    require("./index");
});