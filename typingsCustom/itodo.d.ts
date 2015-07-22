
interface ITodo{
	
	id?: string;
	owner?:string;
	
    avg?:number;
    min?:number;
    max?:number;
    title:string;
    totalDones?:number;
    totalTime?:number;
    //for running
    isRunning?: boolean;
    isDone?:boolean;
    startTime?:Date;
    endTime?:Date;
    runTime?:number;

}
