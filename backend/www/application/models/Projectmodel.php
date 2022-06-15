<?php

    class Projectmodel extends CI_Model
    {
        public function GetAllProjects()
        {
            return $this->db->query("SELECT * FROM projects INNER JOIN fields ON projects.field_id=fields.field_id ORDER BY project_id DESC")->result();
        }
        public function GetAllProjectsIdAsc()
        {
            return $this->db->query("SELECT * FROM projects INNER JOIN fields ON projects.field_id=fields.field_id ORDER BY project_id ASC")->result();
        }
        public function GetAllProjectsIdDesc()
        {
            return $this->db->query("SELECT * FROM projects INNER JOIN fields ON projects.field_id=fields.field_id ORDER BY project_id DESC")->result();
        }
        public function GetAllProjectsProjectNameAsc()
        {
            return $this->db->query("SELECT * FROM projects INNER JOIN fields ON projects.field_id=fields.field_id ORDER BY project_name ASC")->result();
        }
        public function GetAllProjectsProjectNameDesc()
        {
            return $this->db->query("SELECT * FROM projects INNER JOIN fields ON projects.field_id=fields.field_id ORDER BY project_name DESC")->result();
        }
        public function GetAllProjectsProjectFieldAsc()
        {
            return $this->db->query("SELECT * FROM projects INNER JOIN fields ON projects.field_id=fields.field_id ORDER BY field_name ASC")->result();
        }
        public function GetAllProjectsProjectFieldDesc()
        {
            return $this->db->query("SELECT * FROM projects INNER JOIN fields ON projects.field_id=fields.field_id ORDER BY field_name DESC")->result();
        }
        public function GetAllProjectsProjectDurationAsc()
        {
            return $this->db->query("SELECT * FROM projects INNER JOIN fields ON projects.field_id=fields.field_id ORDER BY project_duration ASC")->result();
        }
        public function GetAllProjectsProjectDurationDesc()
        {
            return $this->db->query("SELECT * FROM projects INNER JOIN fields ON projects.field_id=fields.field_id ORDER BY project_duration DESC")->result();
        }
        public function GetAllProjectsProjectDifficulityAsc()
        {
            return $this->db->query("SELECT * FROM projects INNER JOIN fields ON projects.field_id=fields.field_id ORDER BY project_difficulty ASC")->result();
        }
        public function GetAllProjectsProjectDifficulityDesc()
        {
            return $this->db->query("SELECT * FROM projects INNER JOIN fields ON projects.field_id=fields.field_id ORDER BY project_difficulty DESC")->result();
        }
        public function GetAllProjectsYearProjectIdAsc($id)
        {
          return $this->db->query("SELECT * FROM projects INNER JOIN fields ON projects.field_id=fields.field_id WHERE project_year = '$id' ORDER BY project_id ASC")->result();
        }
        public function GetAllProjectsYearProjectIdDesc($id)
        {
          return $this->db->query("SELECT * FROM projects INNER JOIN fields ON projects.field_id=fields.field_id WHERE project_year = '$id' ORDER BY project_id DESC")->result();
        }
        public function GetAllProjectsYearProjectNameAsc($id)
        {
          return $this->db->query("SELECT * FROM projects INNER JOIN fields ON projects.field_id=fields.field_id WHERE project_year = '$id' ORDER BY project_name ASC")->result();
        }
        public function GetAllProjectsYearProjectNameDesc($id)
        {
          return $this->db->query("SELECT * FROM projects INNER JOIN fields ON projects.field_id=fields.field_id WHERE project_year = '$id' ORDER BY project_name DESC")->result();
        }
        public function GetAllProjectsYearProjectFieldAsc($id)
        {
          return $this->db->query("SELECT * FROM projects INNER JOIN fields ON projects.field_id=fields.field_id WHERE project_year = '$id' ORDER BY field_name ASC")->result();
        }
        public function GetAllProjectsYearProjectFieldDesc($id)
        {
          return $this->db->query("SELECT * FROM projects INNER JOIN fields ON projects.field_id=fields.field_id WHERE project_year = '$id' ORDER BY field_name DESC")->result();
        }
        public function GetAllProjectsYearProjectDurationAsc($id)
        {
          return $this->db->query("SELECT * FROM projects INNER JOIN fields ON projects.field_id=fields.field_id WHERE project_year = '$id' ORDER BY project_duration ASC")->result();
        }
        public function GetAllProjectsYearProjectDurationDesc($id)
        {
          return $this->db->query("SELECT * FROM projects INNER JOIN fields ON projects.field_id=fields.field_id WHERE project_year = '$id' ORDER BY project_duration DESC")->result();
        }
        public function GetAllProjectsYearProjectDifficulityAsc($id)
        {
          return $this->db->query("SELECT * FROM projects INNER JOIN fields ON projects.field_id=fields.field_id WHERE project_year = '$id' ORDER BY project_difficulty ASC")->result();
        }
        public function GetAllProjectsYearProjectDifficulityDesc($id)
        {
          return $this->db->query("SELECT * FROM projects INNER JOIN fields ON projects.field_id=fields.field_id WHERE project_year = '$id' ORDER BY project_difficulty DESC")->result();
        }
        public function GetSingleProject($id)
        {
            return $this->db->query("SELECT * FROM projects INNER JOIN fields ON projects.field_id=fields.field_id WHERE project_id = '$id'")->result();
        }
        public function EditProject($id, $project_duration, $project_difficulity, $project_name, $project_description, $field_id)
        {
            return $this->db->query("UPDATE projects SET project_duration = '$project_duration', project_difficulty = '$project_difficulity', project_name = '$project_name', project_description = '$project_description', field_id = '$field_id' WHERE project_id = '$id'");
        }
        public function GetSingleProjectByName($name)
        {
            return $this->db->query("SELECT * FROM projects WHERE project_name = '$name'")->result();
        }
        public function GetTeachersForSingleProject($id)
        {
            return $this->db->query("SELECT teachers.teacher_firstname, teachers.teacher_lastname, teachers.teacher_email, teacher_image FROM projects INNER JOIN fields ON projects.field_id = fields.field_id INNER JOIN teachers ON projects.field_id = teachers.field_id WHERE project_id = '$id'")->result();
        }
        public function GetAllFields()
        {
            return $this->db->query("SELECT * FROM fields")->result();
        }
        public function GetFieldsById($id)
        {
            return $this->db->query("SELECT * FROM fields WHERE field_id = '$id'")->result();
        }

        public function AddNewProject($project_name, $project_description, $project_duration, $field_id, $project_difficulty, $project_year)
        {
            $this->db->query("INSERT INTO projects(project_name, project_description, project_duration, field_id, project_difficulty, project_year) VALUES('$project_name', '$project_description', '$project_duration', '$field_id', '$project_difficulty', '$project_year')");
        }

        public function AddSuppliesProject($projectId, $supplyName, $supplyLink)
        {
          $this->db->query("INSERT INTO project_supplies(supply_name, supply_filename, project_id) VALUES('$supplyName', '$supplyLink', '$projectId')");
        }

        public function DeleteSupply($supplyId)
        {
          $this->db->query("DELETE FROM project_supplies WHERE supply_id = '$supplyId'");
        }

        public function DeleteProject($id)
        {
            $this->db->query("DELETE FROM projects WHERE project_id = '$id'");
        }

        public function GetApplicationById($id)
        {
          return $this->db->query("SELECT * FROM `project_applications` INNER JOIN students ON project_applications.student_id = students.student_id INNER JOIN projects ON project_applications.project_id = projects.project_id INNER JOIN fields on project_applications.field_id = fields.field_id WHERE application_id = '$id'")->result();
        }

        public function GetApplicationByProjectId($studentId, $projectId)
        {
          return $this->db->query("SELECT * FROM project_applications WHERE student_id = '$studentId' AND project_id = '$projectId' AND finish = '1'")->result();
        }

        public function GetApplicationsByField($id)
        {
          return $this->db->query("SELECT * FROM `project_applications` INNER JOIN students on project_applications.student_id = students.student_id INNER JOIN fields ON project_applications.field_id = fields.field_id INNER JOIN projects on project_applications.project_id = projects.project_id WHERE project_applications.field_id = '$id'")->result();
        }

        public function AddApplication($student_id, $project_id, $field_id, $finish)
        {
          $this->db->query("INSERT INTO project_applications(student_id, project_id, field_id, finish) VALUES('$student_id', '$project_id', '$field_id', '$finish')");
        }

        public function GetStudentProjects($id)
        {
          return $this->db->query("SELECT * FROM `student_projects` INNER JOIN students ON student_projects.student_id = students.student_id INNER JOIN projects ON student_projects.project_id = projects.project_id INNER JOIN fields ON student_projects.field_id = fields.field_id WHERE student_projects.student_id = '$id' AND finished = 0")->result();
        }

        public function GetAllStudentProjects($id)
        {
          return $this->db->query("SELECT * FROM `student_projects` INNER JOIN students ON student_projects.student_id = students.student_id INNER JOIN projects ON student_projects.project_id = projects.project_id INNER JOIN fields ON student_projects.field_id = fields.field_id WHERE student_projects.student_id = '$id'")->result();
        }

        public function FinishProject($studentId, $projectId)
        {
          $this->db->query("UPDATE student_projects SET finished = 1 WHERE student_id = '$studentId' AND project_id = '$projectId'");
        }

        public function UnfinishProject($studentId, $projectId)
        {
          $this->db->query("UPDATE student_projects SET finished = 0 WHERE student_id = '$studentId' AND project_id = '$projectId'");
        }

        public function GetFinishedProjects($id)
        {
          return $this->db->query("SELECT * FROM `student_projects` INNER JOIN students ON student_projects.student_id = students.student_id INNER JOIN projects ON student_projects.project_id = projects.project_id INNER JOIN fields ON student_projects.field_id = fields.field_id WHERE student_projects.student_id = '$id' AND finished = 1")->result();
        }

        public function GetStudentProject($id, $projectId)
        {
          return $this->db->query("SELECT * FROM student_projects INNER JOIN fields ON student_projects.field_id = fields.field_id INNER JOIN projects ON student_projects.project_id = projects.project_id WHERE student_id = '$id' AND student_projects.project_id = '$projectId'")->result();
        }

        public function GetApplicationsByStudentId($id, $projectId)
        {
          return $this->db->query("SELECT * FROM `project_applications` WHERE student_id = '$id' AND project_id = '$projectId'")->result();
        }

        public function DenyApplication($id)
        {
          $this->db->query("DELETE FROM project_applications WHERE application_id = '$id'");
        }

        public function AcceptApplication($student_id, $project_id, $field_id)
        {
          $this->db->query("INSERT INTO student_projects(student_id, project_id, field_id) VALUES('$student_id', '$project_id', '$field_id')");
        }

        public function GetMessagesSingleProject($studentId, $projectId)
        {
          return $this->db->query("SELECT * FROM `messages` INNER JOIN teachers ON messages.teacher_id = teachers.teacher_id WHERE project_id = '$projectId' AND student_id = '$studentId' AND info = '0' ORDER BY message_created DESC")->result();
        }

        public function SendMessage($message, $studentId, $teacherId, $projectId, $info)
        {
          $this->db->query("INSERT INTO messages(message, student_id, teacher_id, project_id, info) VALUES('$message', '$studentId', '$teacherId', '$projectId', '$info')");
        }

        public function UpdateProgress($studentId, $projectId, $progress)
        {
          $this->db->query("UPDATE student_projects SET progress = '$progress' WHERE student_id = '$studentId' AND project_id = '$projectId'");
        }

        public function InsertProgress($studentId, $projectId, $progress, $progress_teacher)
        {
          $this->db->query("INSERT INTO saved_progress(project_id, student_id, progress, progress_teacher) VALUES('$projectId', '$studentId', '$progress', '$progress_teacher')");
        }
        public function getProgress($studentId, $projectId)
        {
          return $this->db->query("SELECT * FROM `saved_progress` WHERE student_id = '$studentId' AND project_id = '$projectId'")->result();
        }
        public function getLatestProgress($studentId, $projectId)
        {
          return $this->db->query("SELECT * FROM `saved_progress` WHERE student_id = '$studentId' AND project_id = '$projectId' ORDER BY progress_id DESC LIMIT 1")->result();
        }

        public function DeleteStudentProject($studentId, $projectId)
        {
          $this->db->query("DELETE FROM student_projects WHERE student_id = '$studentId' AND project_id = '$projectId'");
        }

        public function AddField($fieldName)
        {
          $this->db->query("INSERT INTO fields(field_name) VALUES('$fieldName')");
        }

        public function DeleteField($fieldId)
        {
          $this->db->query("DELETE FROM fields WHERE field_id = '$fieldId'");
        }

        public function DeleteProjectsByField($fieldId)
        {
          $this->db->query("DELETE FROM projects WHERE field_id = '$fieldId'");
        }

        public function DeleteSuppliesByProjectId($projectId)
        {
          $this->db->query("DELETE FROM project_supplies WHERE project_id = '$projectId'");
        }

        public function GetAllSuppliesByProjectId($projectId)
        {
          return $this->db->query("SELECT * FROM project_supplies WHERE project_id = '$projectId'")->result();
        }
    }
