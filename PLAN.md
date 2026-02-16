# Daily Work Logger — Comprehensive Project Plan

---

## 1. Overview

A personal daily work logging tool built as a **React single-page application**. The app enables structured documentation of daily work tasks through a smart, repeatable form. Data persists across sessions via Claude's persistent storage API. The app is **mobile-first and fully responsive**.

### Core Principles

- **Speed**: Logging should take under 2 minutes per session
- **Structure**: Every field is designed to be filterable and analyzable
- **Smart Defaults**: The form remembers yesterday's setup to minimize repetitive input
- **Flexibility**: Users can customize projects, categories, technologies, and sub-technologies
- **Portability**: Full data and schema export at any time

---

## 2. Tech Stack

| Layer       | Choice                                           |
|------------|--------------------------------------------------|
| Framework  | React (single .jsx artifact)                     |
| Styling    | Tailwind CSS (core utility classes only)         |
| Charts     | Recharts                                          |
| Icons      | Lucide React                                      |
| Storage    | Claude Persistent Storage API (`window.storage`) |
| Theme      | Dark                                              |
| Target     | Mobile-first, responsive up to desktop            |

---

## 3. Pages & Navigation

The app has **3 pages**, accessed via a navigation bar:

| Page              | Icon         | Purpose                                  |
|-------------------|-------------|------------------------------------------|
| **Log Entry**     | PenLine     | Daily task logging form (default/home)   |
| **Dashboard**     | BarChart3   | Analytics, graphs, history, exports      |
| **Schema Manager**| Settings    | View and edit all form configuration     |

**Navigation behavior:**
- Desktop: Horizontal top nav bar with icon + label
- Mobile: Bottom tab bar with icons, active tab highlighted

---

## 4. Data Models

### 4.1 Storage Keys

All data batched into minimal keys to reduce storage calls:

| Key                    | Content                                              |
|-----------------------|------------------------------------------------------|
| `worklog:entries`      | Array of all logged task entries                     |
| `worklog:schema`       | Full form config (projects, categories, techs, subs) |
| `worklog:preferences`  | Last-used selections for smart defaults              |

---

### 4.2 Entry Model (single task)

```json
{
  "id": "entry_1708100000000_0",
  "date": "2026-02-16",
  "dayNumber": 14,
  "project": "Project Alpha",
  "categories": ["feature", "code review"],
  "title": "Built user auth flow",
  "description": "Implemented OAuth2 login with Google provider...",
  "technologies": [
    {
      "tech": "Python",
      "subTechs": ["Flask", "SQLAlchemy"]
    },
    {
      "tech": "AWS",
      "subTechs": ["RDS", "Lambda"]
    },
    {
      "tech": "PostgreSQL",
      "subTechs": []
    }
  ],
  "teamType": "solo",
  "createdAt": "2026-02-16T17:50:00.000Z"
}
```

---

### 4.3 Schema Model (form configuration)

```json
{
  "projects": [
    "Project Alpha",
    "Project Beta",
    "Internal Tools"
  ],
  "categories": [
    "bug fix",
    "feature",
    "meeting",
    "research",
    "code review",
    "devops",
    "documentation"
  ],
  "technologies": [
    {
      "name": "Python",
      "group": "languages",
      "subTechs": ["Flask", "Django", "FastAPI", "Pandas", "NumPy", "SQLAlchemy", "Celery", "Pytest", "Pydantic", "BeautifulSoup"]
    },
    {
      "name": "JavaScript",
      "group": "languages",
      "subTechs": ["React", "Vue", "Angular", "Next.js", "Express.js", "Node.js", "jQuery", "D3.js", "Webpack", "Vite"]
    },
    {
      "name": "TypeScript",
      "group": "languages",
      "subTechs": ["React", "Angular", "Next.js", "NestJS", "Zod", "Prisma"]
    },
    {
      "name": "C#",
      "group": "languages",
      "subTechs": [".NET", "ASP.NET", "Entity Framework", "Blazor", "Unity", "LINQ"]
    },
    {
      "name": "Java",
      "group": "languages",
      "subTechs": ["Spring Boot", "Hibernate", "Maven", "Gradle", "JUnit", "Kafka Client"]
    },
    {
      "name": "Go",
      "group": "languages",
      "subTechs": ["Gin", "Echo", "GORM", "Cobra"]
    },
    {
      "name": "Rust",
      "group": "languages",
      "subTechs": ["Tokio", "Actix", "Serde", "Diesel"]
    },
    {
      "name": "C++",
      "group": "languages",
      "subTechs": ["Qt", "Boost", "CMake", "OpenCV"]
    },
    {
      "name": "PHP",
      "group": "languages",
      "subTechs": ["Laravel", "Symfony", "WordPress", "Composer"]
    },
    {
      "name": "Ruby",
      "group": "languages",
      "subTechs": ["Rails", "Sinatra", "RSpec", "Sidekiq"]
    },
    {
      "name": "Swift",
      "group": "languages",
      "subTechs": ["SwiftUI", "UIKit", "Combine", "CoreData"]
    },
    {
      "name": "Kotlin",
      "group": "languages",
      "subTechs": ["Ktor", "Jetpack Compose", "Coroutines", "Room"]
    },
    {
      "name": "SQL",
      "group": "languages",
      "subTechs": ["PostgreSQL", "MySQL", "SQLite", "T-SQL", "PL/pgSQL"]
    },
    {
      "name": "MongoDB",
      "group": "data_engineering",
      "subTechs": ["Mongoose", "Atlas", "Aggregation Pipeline", "Realm"]
    },
    {
      "name": "MySQL",
      "group": "data_engineering",
      "subTechs": ["InnoDB", "MySQL Workbench", "Replication"]
    },
    {
      "name": "PostgreSQL",
      "group": "data_engineering",
      "subTechs": ["pgAdmin", "PostGIS", "pg_dump", "Citus", "TimescaleDB"]
    },
    {
      "name": "Kafka",
      "group": "data_engineering",
      "subTechs": ["Kafka Streams", "Kafka Connect", "Schema Registry", "KSQL", "Confluent"]
    },
    {
      "name": "Redis",
      "group": "data_engineering",
      "subTechs": ["Redis Cluster", "Redis Streams", "RedisJSON", "Redis Pub/Sub"]
    },
    {
      "name": "Kubernetes",
      "group": "data_engineering",
      "subTechs": ["Helm", "kubectl", "Istio", "ArgoCD", "Kustomize", "K9s"]
    },
    {
      "name": "OpenShift",
      "group": "data_engineering",
      "subTechs": ["OC CLI", "Routes", "BuildConfig", "Operators"]
    },
    {
      "name": "Docker",
      "group": "data_engineering",
      "subTechs": ["Docker Compose", "Dockerfile", "Docker Swarm", "Buildkit"]
    },
    {
      "name": "Spark",
      "group": "data_engineering",
      "subTechs": ["PySpark", "Spark SQL", "Spark Streaming", "MLlib"]
    },
    {
      "name": "Airflow",
      "group": "data_engineering",
      "subTechs": ["DAGs", "Operators", "Sensors", "XComs"]
    },
    {
      "name": "Elasticsearch",
      "group": "data_engineering",
      "subTechs": ["Kibana", "Logstash", "Beats", "ELK Stack"]
    },
    {
      "name": "Snowflake",
      "group": "data_engineering",
      "subTechs": ["Snowpipe", "Streams", "Tasks", "dbt + Snowflake"]
    },
    {
      "name": "dbt",
      "group": "data_engineering",
      "subTechs": ["dbt Core", "dbt Cloud", "Jinja", "dbt Tests"]
    },
    {
      "name": "Terraform",
      "group": "data_engineering",
      "subTechs": ["HCL", "Terraform Cloud", "Modules", "State Management"]
    },
    {
      "name": "BigQuery",
      "group": "data_engineering",
      "subTechs": ["BigQuery ML", "Scheduled Queries", "Data Transfer Service"]
    },
    {
      "name": "Redshift",
      "group": "data_engineering",
      "subTechs": ["Redshift Spectrum", "Redshift Serverless", "COPY Command"]
    },
    {
      "name": "Cassandra",
      "group": "data_engineering",
      "subTechs": ["CQL", "DataStax", "Replication Strategies"]
    },
    {
      "name": "DynamoDB",
      "group": "data_engineering",
      "subTechs": ["DynamoDB Streams", "GSI/LSI", "DAX", "PartiQL"]
    },
    {
      "name": "Neo4j",
      "group": "data_engineering",
      "subTechs": ["Cypher", "Graph Data Science", "APOC"]
    },
    {
      "name": "ClickHouse",
      "group": "data_engineering",
      "subTechs": ["MergeTree", "Materialized Views", "ClickHouse Cloud"]
    },
    {
      "name": "Flink",
      "group": "data_engineering",
      "subTechs": ["Flink SQL", "DataStream API", "Flink CDC"]
    },
    {
      "name": "Hive",
      "group": "data_engineering",
      "subTechs": ["HiveQL", "Partitioning", "Bucketing"]
    },
    {
      "name": "Presto/Trino",
      "group": "data_engineering",
      "subTechs": ["Connectors", "Federation", "Trino CLI"]
    },
    {
      "name": "Delta Lake",
      "group": "data_engineering",
      "subTechs": ["Time Travel", "MERGE", "Z-Ordering"]
    },
    {
      "name": "Iceberg",
      "group": "data_engineering",
      "subTechs": ["Partition Evolution", "Schema Evolution", "Hidden Partitioning"]
    },
    {
      "name": "Databricks",
      "group": "data_engineering",
      "subTechs": ["Notebooks", "Unity Catalog", "Workflows", "MLflow"]
    },
    {
      "name": "Grafana",
      "group": "data_engineering",
      "subTechs": ["Dashboards", "Alerting", "Loki", "Tempo"]
    },
    {
      "name": "Prometheus",
      "group": "data_engineering",
      "subTechs": ["PromQL", "Alertmanager", "Exporters", "Thanos"]
    },
    {
      "name": "RabbitMQ",
      "group": "data_engineering",
      "subTechs": ["Exchanges", "Queues", "Bindings", "Management UI"]
    },
    {
      "name": "NATS",
      "group": "data_engineering",
      "subTechs": ["JetStream", "NATS Streaming", "Subject-Based Messaging"]
    },
    {
      "name": "AWS",
      "group": "cloud_and_platforms",
      "subTechs": ["EC2", "S3", "Lambda", "RDS", "ECS", "EKS", "SQS", "SNS", "CloudFormation", "IAM", "CloudWatch", "API Gateway", "Step Functions", "Glue"]
    },
    {
      "name": "Azure",
      "group": "cloud_and_platforms",
      "subTechs": ["Azure Functions", "AKS", "Blob Storage", "Azure SQL", "CosmosDB", "Azure DevOps", "Event Hub", "Data Factory"]
    },
    {
      "name": "GCP",
      "group": "cloud_and_platforms",
      "subTechs": ["Cloud Functions", "GKE", "Cloud Storage", "Cloud SQL", "Pub/Sub", "Dataflow", "Cloud Run"]
    },
    {
      "name": "Git",
      "group": "cloud_and_platforms",
      "subTechs": ["GitHub", "GitLab", "Bitbucket", "Git Flow", "GitHub Actions", "GitLab CI"]
    },
    {
      "name": "Jenkins",
      "group": "cloud_and_platforms",
      "subTechs": ["Jenkinsfile", "Pipeline", "Blue Ocean", "Shared Libraries"]
    }
  ]
}
```

---

### 4.4 Preferences Model (smart defaults)

```json
{
  "lastProject": "Project Alpha",
  "lastCategories": ["feature"],
  "lastTechnologies": [
    { "tech": "Python", "subTechs": ["Flask"] },
    { "tech": "PostgreSQL", "subTechs": [] }
  ],
  "lastTeamType": "solo",
  "lastTaskCount": 2
}
```

---

## 5. Page 1 — Log Entry (Home)

### 5.1 Visual Layout

```
┌──────────────────────────────────────────┐
│  [Log Entry]  [Dashboard]  [Schema]       │  ← nav bar
├──────────────────────────────────────────┤
│  📅 Feb 16, 2026   Day #14   [Clear Page]│  ← date bar
├──────────────────────────────────────────┤
│  Project: [ Project Alpha ▾ ] [+ New]     │  ← project selector
├──────────────────────────────────────────┤
│                                           │
│  ┌─ Task 1 ──────────────── [✕ Clear] ─┐ │
│  │                                      │ │
│  │  Categories:                         │ │
│  │  [feature] [bug fix] [meeting] [+]   │ │
│  │                                      │ │
│  │  Title *                             │ │
│  │  [____________________________]      │ │
│  │                                      │ │
│  │  Technologies:            [Clear]    │ │
│  │  [🔍 Search technologies...]        │ │
│  │  ☑ Python  ☑ AWS  ☐ Docker          │ │
│  │                                      │ │
│  │  ┌─ Sub-techs: Python ──────────┐   │ │
│  │  │ [🔍 Search...]               │   │ │
│  │  │ ☑ Flask  ☐ Django  ☐ FastAPI │   │ │
│  │  │ [+ Add sub-tech]             │   │ │
│  │  └──────────────────────────────┘   │ │
│  │                                      │ │
│  │  ┌─ Sub-techs: AWS ────────────┐    │ │
│  │  │ [🔍 Search...]              │    │ │
│  │  │ ☑ RDS  ☐ Lambda  ☐ S3      │    │ │
│  │  │ [+ Add sub-tech]            │    │ │
│  │  └─────────────────────────────┘    │ │
│  │                                      │ │
│  │  Solo ◉  /  Team ○                  │ │
│  │                                      │ │
│  │  Description (optional)              │ │
│  │  [____________________________]      │ │
│  │  [____________________________]      │ │
│  │                                      │ │
│  └──────────────────────────────────────┘ │
│                                           │
│  ┌─ Task 2 ──────────────── [✕ Clear] ─┐ │
│  │  ...                                 │ │
│  └──────────────────────────────────────┘ │
│                                           │
│            [ ＋ Add Task ]                │
│                                           │
│          [ ✓ Submit Day Log ]             │  ← sticky on mobile
└──────────────────────────────────────────┘
```

### 5.2 Field Details

#### Date & Day Counter
- Date: Auto-set to today, displayed as formatted string, read-only
- Day Number: Calculated as `(count of distinct dates in entries) + 1` if today is new, otherwise same as existing entries for today
- Both shown in a header bar at the top of the form

#### Project Selector
- Dropdown of all projects from schema
- "Add New Project" button: inline text input appears, saves to schema on confirm
- Default: last used project (from preferences)
- Persists across task boxes (page-level, not per-task)

#### Categories (per task)
- Horizontal row of pill/tag buttons
- Tap to toggle selection (multi-select)
- Selected pills are highlighted
- "+" button: inline input to add new category, saved to schema
- Default: last used categories (from preferences)
- Minimal visual footprint — pills only, no labels needed

#### Title (per task)
- Single-line text input
- **Only required field** — red border + message if empty on submit attempt
- Always starts empty (never pre-filled from yesterday)

#### Technologies (per task)
- **Search bar** at top: filters the technology list as you type
- Technologies displayed as grouped checkboxes:
  - **Languages**: Python, C#, JavaScript, TypeScript, Java, Go, Rust, C++, PHP, Ruby, Swift, Kotlin, SQL
  - **Data Engineering**: MongoDB, MySQL, PostgreSQL, Kafka, Redis, Kubernetes, OpenShift, Docker, Spark, Airflow, Elasticsearch, Snowflake, dbt, Terraform, BigQuery, Redshift, Cassandra, DynamoDB, Neo4j, ClickHouse, Flink, Hive, Presto/Trino, Delta Lake, Iceberg, Databricks, Grafana, Prometheus, RabbitMQ, NATS
  - **Cloud & Platforms**: AWS, Azure, GCP, Git, Jenkins
- Selected techs shown as **removable chips** above the search bar
- **"Clear" button** resets all selections
- Default: last used technologies (from preferences)
- On mobile: the tech list is in a collapsible/expandable panel

#### Sub-Technologies (per selected tech, per task)
- **When a technology is selected**, a sub-tech box appears below the tech section
- Each sub-tech box is labeled with its parent tech name (e.g., "Sub-techs: Python")
- Contains:
  - Search bar to filter sub-techs
  - Checkboxes of sub-techs bound to that specific tech
  - "+" button to add a new sub-tech (saved to schema under that tech)
- **Only shows sub-techs related to the parent tech** — Python subs only show Python libraries, AWS subs only show AWS services, etc.
- If a tech has no sub-techs defined yet, the box shows the "+" button with a prompt "Add sub-technologies for [Tech]"
- When a tech is deselected, its sub-tech box disappears and selections are cleared

#### Solo / Team (per task)
- Two-option toggle (radio buttons styled as a segmented control)
- Default: last used value

#### Description (per task)
- Multi-line textarea
- Optional, no character limit
- Always starts empty

#### Clear Controls
- **Clear Page** (top bar): Resets entire form — 1 empty task, no selections, only date remains
- **Clear Task** (per task card): Resets that specific task box to empty
- **Clear** (in tech selector): Clears only technology + sub-tech selections for that task
- **Remove Task ✕** (per task card, shown when >1 task exists): Deletes that task box entirely

#### "+ Add Task" Button
- Appends a new empty task box
- Smooth scroll animation to the new task
- Inherits page-level project but all task fields empty

#### Submit Button
- Validates all task boxes have a title
- Saves each task as a separate entry in `worklog:entries`
- Updates `worklog:preferences` with current selections
- Shows success toast/banner
- On mobile: sticky at bottom of screen

### 5.3 Smart Defaults Logic

On page load:
1. Load `worklog:preferences`
2. Pre-fill project selector with `lastProject`
3. Create N task boxes where N = `lastTaskCount`
4. Each task box pre-fills: categories from `lastCategories`, technologies from `lastTechnologies` (including sub-tech selections), team type from `lastTeamType`
5. Title and description always empty
6. If no preferences exist (first use), show 1 empty task box with no pre-fills

---

## 6. Page 2 — Dashboard

### 6.1 Visual Layout

```
┌──────────────────────────────────────────┐
│  [Log Entry]  [Dashboard]  [Schema]       │
├──────────────────────────────────────────┤
│  Export: [📄 CSV Data] [📋 Schema JSON]  │
├──────────────────────────────────────────┤
│  ┌────────┐ ┌────────┐ ┌────────┐       │
│  │  Days  │ │ Tasks  │ │  Top   │       │
│  │ Logged │ │ Total  │ │  Tech  │       │
│  │   14   │ │   47   │ │ Python │       │
│  └────────┘ └────────┘ └────────┘       │
│  ┌────────┐ ┌────────┐                   │
│  │  Top   │ │  This  │                   │
│  │Project │ │  Week  │                   │
│  │Alpha   │ │ 8 tasks│                   │
│  └────────┘ └────────┘                   │
├──────────────────────────────────────────┤
│  Filters:                                 │
│  [This Week ▾] [All Projects ▾] [All ▾]  │
├──────────────────────────────────────────┤
│  ┌──────────────────────────────────┐    │
│  │  📊 Tasks Over Time (bar chart)  │    │
│  │  ▓▓▓░░▓▓▓▓░▓▓▓▓▓░░▓▓▓▓▓▓▓     │    │
│  └──────────────────────────────────┘    │
│  ┌───────────────┐ ┌────────────────┐    │
│  │ Tech Usage    │ │ Categories     │    │
│  │ (horizontal   │ │ (donut chart)  │    │
│  │  bar chart)   │ │                │    │
│  └───────────────┘ └────────────────┘    │
│  ┌───────────────┐ ┌────────────────┐    │
│  │ Solo vs Team  │ │ Projects       │    │
│  │ (donut chart) │ │ (bar chart)    │    │
│  └───────────────┘ └────────────────┘    │
│  ┌───────────────────────────────────┐   │
│  │ Sub-Tech Breakdown               │   │
│  │ (stacked bar: top techs w/ subs) │   │
│  └───────────────────────────────────┘   │
├──────────────────────────────────────────┤
│  Entry History                            │
│  ┌───────────────────────────────────┐   │
│  │ 📅 Day 14 — Feb 16, 2026         │   │
│  │  Project: Alpha                   │   │
│  │  ► Built user auth flow           │   │
│  │    Python (Flask, SQLAlchemy)      │   │
│  │    AWS (RDS, Lambda)              │   │
│  │    [feature] [solo]               │   │
│  │  ► Reviewed PR #42               │   │
│  │    TypeScript (React)             │   │
│  │    [code review] [team]           │   │
│  ├───────────────────────────────────┤   │
│  │ 📅 Day 13 — Feb 15, 2026         │   │
│  │  ...                              │   │
│  └───────────────────────────────────┘   │
└──────────────────────────────────────────┘
```

### 6.2 Overview Cards

| Card          | Calculation                                        |
|--------------|-----------------------------------------------------|
| Days Logged  | Count of distinct `date` values in entries           |
| Total Tasks  | Total count of entries                               |
| Top Tech     | Most frequently appearing technology                 |
| Top Project  | Project with highest entry count                     |
| This Week    | Entries where `date` falls in current Mon–Sun week   |

Cards are in a horizontally scrollable row on mobile (2 visible, swipe for more).

### 6.3 Filters

All filters apply globally to charts AND history below:

| Filter      | Options                                                  |
|------------|----------------------------------------------------------|
| Date Range | This Week, This Month, Last 30 Days, Last 90 Days, All Time |
| Project    | All Projects, or any specific project from schema        |
| Category   | All Categories, or any specific category from schema     |

Filters are dropdown selects. On mobile they stack vertically.

### 6.4 Charts

| Chart                    | Type            | Data                                      |
|--------------------------|----------------|------------------------------------------|
| Tasks Over Time          | Bar chart       | X: dates, Y: task count per day          |
| Technology Usage         | Horizontal bar  | Top 10 most-used technologies            |
| Category Breakdown       | Donut/pie       | Distribution of categories               |
| Solo vs Team             | Donut/pie       | Ratio of solo to team tasks              |
| Projects Distribution    | Bar chart       | Tasks per project                        |
| Sub-Tech Breakdown       | Stacked bar     | Top 5 techs with their most-used sub-techs |

Charts are responsive: 2 per row on desktop, stacked single column on mobile.

### 6.5 Entry History

- Reverse chronological list grouped by day
- Each day header shows: day number, formatted date, project name
- Each entry shows: title, technologies with sub-techs in parentheses, category pills, solo/team badge
- Expandable: tap a task to reveal full description
- Respects all active filters

### 6.6 Exports

**Export CSV Data:**
- Generates a CSV with columns: `date, dayNumber, project, categories, title, description, technologies, subTechnologies, teamType, createdAt`
- Technologies and sub-techs formatted as: `Python (Flask, SQLAlchemy) | AWS (RDS, Lambda)`
- Triggers browser download

**Export Schema JSON:**
- Exports the full `worklog:schema` object as formatted JSON
- Includes: all projects, all categories, all technologies with their sub-techs and group assignments
- Purpose: backup, migration, or reimport into a future version of the app

---

## 7. Page 3 — Schema Manager

### 7.1 Purpose

A dedicated page to view, add, edit, and delete all configurable options in the form. This prevents the schema from becoming messy or bloated over time.

### 7.2 Visual Layout

```
┌──────────────────────────────────────────┐
│  [Log Entry]  [Dashboard]  [Schema]       │
├──────────────────────────────────────────┤
│                                           │
│  ┌─ Projects ────────────────────────┐   │
│  │  • Project Alpha            [✕]   │   │
│  │  • Project Beta             [✕]   │   │
│  │  • Internal Tools           [✕]   │   │
│  │  [+ Add Project]                  │   │
│  └───────────────────────────────────┘   │
│                                           │
│  ┌─ Categories ──────────────────────┐   │
│  │  • bug fix          [✕]          │   │
│  │  • feature          [✕]          │   │
│  │  • meeting          [✕]          │   │
│  │  • research         [✕]          │   │
│  │  • code review      [✕]          │   │
│  │  • devops           [✕]          │   │
│  │  • documentation    [✕]          │   │
│  │  [+ Add Category]                │   │
│  └───────────────────────────────────┘   │
│                                           │
│  ┌─ Technologies ────────────────────┐   │
│  │  [🔍 Filter technologies...]      │   │
│  │                                    │   │
│  │  ── Languages ──                   │   │
│  │  ┌ Python ──────────────── [✕] ┐  │   │
│  │  │ Sub-techs:                   │  │   │
│  │  │ Flask [✕] Django [✕]        │  │   │
│  │  │ FastAPI [✕] Pandas [✕]      │  │   │
│  │  │ NumPy [✕] SQLAlchemy [✕]    │  │   │
│  │  │ Celery [✕] Pytest [✕]      │  │   │
│  │  │ Pydantic [✕] BS4 [✕]       │  │   │
│  │  │ [+ Add sub-tech]            │  │   │
│  │  └─────────────────────────────┘  │   │
│  │  ┌ JavaScript ──────────── [✕] ┐  │   │
│  │  │ Sub-techs:                   │  │   │
│  │  │ React [✕] Vue [✕] ...      │  │   │
│  │  │ [+ Add sub-tech]            │  │   │
│  │  └─────────────────────────────┘  │   │
│  │  ...                               │   │
│  │                                    │   │
│  │  ── Data Engineering ──            │   │
│  │  ┌ Kafka ───────────────── [✕] ┐  │   │
│  │  │ ...                          │  │   │
│  │  └─────────────────────────────┘  │   │
│  │  ...                               │   │
│  │                                    │   │
│  │  ── Cloud & Platforms ──           │   │
│  │  ...                               │   │
│  │                                    │   │
│  │  [+ Add Technology]                │   │
│  └───────────────────────────────────┘   │
│                                           │
│  ┌─ Danger Zone ─────────────────────┐   │
│  │  [🗑 Reset All Data]              │   │
│  │  [🗑 Reset Schema to Defaults]    │   │
│  └───────────────────────────────────┘   │
└──────────────────────────────────────────┘
```

### 7.3 Sections

#### Projects Section
- List of all projects with delete (✕) button each
- "Add Project" button with inline text input
- Delete confirmation: warns if entries exist using that project

#### Categories Section
- List of all categories with delete (✕) button each
- "Add Category" button with inline text input
- Delete confirmation: warns if entries exist using that category

#### Technologies Section
- Search/filter bar at top
- Grouped by type: Languages, Data Engineering, Cloud & Platforms
- Each tech is an expandable card showing:
  - Tech name with delete button
  - All sub-techs as removable chips/pills with ✕ buttons
  - "Add sub-tech" button with inline text input
- "Add Technology" button at bottom: prompts for name and group selection
- When adding a new tech via the "+" on the log page, it also shows up here
- Delete confirmation for techs: warns if entries exist using that tech

#### Danger Zone
- **Reset All Data**: Clears all entries, preferences (keeps schema). Requires confirmation.
- **Reset Schema to Defaults**: Resets schema to the default preset list (loses custom additions). Requires double confirmation.

---

## 8. Mobile Responsiveness

### 8.1 Breakpoints

| Screen       | Width       | Layout                        |
|-------------|------------|-------------------------------|
| Mobile      | < 640px    | Single column, bottom nav     |
| Tablet      | 640–1024px | Adaptive columns              |
| Desktop     | > 1024px   | Full layout, top nav          |

### 8.2 Mobile-Specific Adaptations

| Component               | Mobile Behavior                                    |
|-------------------------|----------------------------------------------------|
| Navigation              | Bottom tab bar with icons                          |
| Submit button           | Sticky at bottom of screen                         |
| Technology selector     | Collapsible accordion per group                    |
| Sub-tech boxes          | Full-width, stacked below tech selector            |
| Dashboard cards         | Horizontal scroll, 2 visible at a time             |
| Charts                  | Single column, full width                          |
| Filters                 | Stacked vertically                                 |
| Category pills          | Wrapping row, smaller size                         |
| History entries         | Compact cards, tap to expand                       |
| Task boxes              | Full-width cards with generous padding             |
| Touch targets           | Minimum 44px height on all interactive elements    |
| Schema manager techs    | Accordion-style collapse for each tech             |

---

## 9. UI/UX Design Direction

### Theme: Dark, clean, developer-focused

- **Background**: Deep charcoal/navy (#0f1117 to #1a1d2e)
- **Cards**: Slightly lighter surface (#1e2235) with subtle border (#2a2f45)
- **Accent color**: Electric blue (#4f8ff7) for primary actions, selected states
- **Success**: Soft green (#34d399) for submit confirmation
- **Warning/Delete**: Soft red (#f87171) for destructive actions
- **Text**: White (#f1f5f9) primary, muted gray (#94a3b8) secondary
- **Typography**: Clean sans-serif (system font stack for performance)
- **Radius**: Rounded corners (8px cards, 6px inputs, full-round pills)
- **Spacing**: Generous padding, clear visual hierarchy
- **Animations**: Smooth transitions on task add/remove, toast notifications

---

## 10. State Management

All state managed via React `useState` and `useReducer`. No external state library.

### Key State Objects

```
appState: {
  currentPage: "log" | "dashboard" | "schema",
  entries: Entry[],
  schema: Schema,
  preferences: Preferences,
  isLoading: boolean
}

logPageState: {
  date: string,
  dayNumber: number,
  selectedProject: string,
  tasks: TaskFormState[],
  isSubmitting: boolean
}

dashboardState: {
  dateFilter: string,
  projectFilter: string,
  categoryFilter: string,
  filteredEntries: Entry[]
}
```

### Storage Sync

- On app load: Read all 3 storage keys, populate state
- On submit: Write entries + preferences
- On schema change: Write schema immediately
- All storage operations wrapped in try/catch with error toasts

---

## 11. Build Phases

### Phase 1: Core Structure
- App shell with 3-page navigation
- Storage initialization with default schema
- Loading states

### Phase 2: Log Entry Page
- Project selector with add-new
- Task box component with all fields
- Technology selector with search and groups
- Sub-technology boxes with per-tech binding
- Categories with add-new
- Smart defaults from preferences
- Clear controls at all levels
- Submit with validation and storage

### Phase 3: Dashboard
- Overview stat cards
- All 6 charts with Recharts
- Filters affecting charts and history
- Entry history with expand/collapse
- CSV export
- Schema JSON export

### Phase 4: Schema Manager
- Projects CRUD
- Categories CRUD
- Technologies CRUD with sub-tech management
- Danger zone with confirmations

### Phase 5: Polish
- Mobile responsiveness pass
- Animations and transitions
- Error handling and edge cases
- Performance optimization for large datasets
