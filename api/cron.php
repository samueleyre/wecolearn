<?php
require(__DIR__ . '/vendor/autoload.php');

echo "[CRON] Starting tasks scheduler\n";

function build_cron() {
    // Increment redis key every minute
    $inc_job = new \Cron\Job\ShellJob();
    $inc_job->setCommand('php bin/console shapecode:cron:run');
    $inc_job->setSchedule(new \Cron\Schedule\CrontabSchedule('*/1 * * * *'));

    $resolver = new \Cron\Resolver\ArrayResolver();
    $resolver->addJob($inc_job);

    $cron = new \Cron\Cron();
    $cron->setExecutor(new \Cron\Executor\Executor());
    $cron->setResolver($resolver);
    return $cron;
}

// Every 60 seconds, run the scheduler which will execute the tasks
// which have to be started at the given minute.
while(true) {
    $cron = build_cron();

    echo "[CRON] Running tasks\n";
    $report = $cron->run();

    echo "[CRON] " . count($report->getReports()) . " tasks have been executed\n";
    foreach($report->getReports() as $job_report) {
        $output = $job_report->getOutput();
        foreach($output as $line) {
            echo "[CRON] " . $line;
        }
    }
    sleep(60);
}
?>
