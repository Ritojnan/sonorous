-- CreateTable
CREATE TABLE "Company" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "employeeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    CONSTRAINT "Employee_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Chatbot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chatbotName" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    CONSTRAINT "Chatbot_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChatbotIntent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "chatbotId" INTEGER NOT NULL,
    CONSTRAINT "ChatbotIntent_chatbotId_fkey" FOREIGN KEY ("chatbotId") REFERENCES "Chatbot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChatbotEntity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "chatbotId" INTEGER NOT NULL,
    CONSTRAINT "ChatbotEntity_chatbotId_fkey" FOREIGN KEY ("chatbotId") REFERENCES "Chatbot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChatbotResponse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "response" TEXT NOT NULL,
    "chatbotId" INTEGER NOT NULL,
    CONSTRAINT "ChatbotResponse_chatbotId_fkey" FOREIGN KEY ("chatbotId") REFERENCES "Chatbot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChatbotSession" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chatbotId" INTEGER NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "liveAgent" BOOLEAN NOT NULL,
    "type" TEXT NOT NULL,
    "intent" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    CONSTRAINT "ChatbotSession_chatbotId_fkey" FOREIGN KEY ("chatbotId") REFERENCES "Chatbot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChatbotSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Metric" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chatbotId" INTEGER NOT NULL,
    "metricType" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "timestamp" DATETIME NOT NULL,
    CONSTRAINT "Metric_chatbotId_fkey" FOREIGN KEY ("chatbotId") REFERENCES "Chatbot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CustomerInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CustomerConversation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" INTEGER NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL,
    CONSTRAINT "CustomerConversation_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "CustomerInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CustomerConversation_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Conversation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "conversationId" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    CONSTRAINT "Conversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ConversationMessage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message" TEXT NOT NULL,
    "conversationId" INTEGER NOT NULL,
    CONSTRAINT "ConversationMessage_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ChatbotOwners" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ChatbotOwners_A_fkey" FOREIGN KEY ("A") REFERENCES "Chatbot" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ChatbotOwners_B_fkey" FOREIGN KEY ("B") REFERENCES "Employee" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employeeId_key" ON "Employee"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatbotSession_sessionId_key" ON "ChatbotSession"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerInfo_customerId_key" ON "CustomerInfo"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_conversationId_key" ON "Conversation"("conversationId");

-- CreateIndex
CREATE UNIQUE INDEX "_ChatbotOwners_AB_unique" ON "_ChatbotOwners"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatbotOwners_B_index" ON "_ChatbotOwners"("B");
