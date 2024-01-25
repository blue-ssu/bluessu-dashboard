import { ProjectObject } from "./project.object";

export class ProjectUserObject {
    id: number;
    project: ProjectObject;

    constructor(data: { id: number; project: ProjectObject }) {
        this.id = data.id;
        this.project = data.project;
    }
}
